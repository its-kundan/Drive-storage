"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { Query, ID } from "node-appwrite";
import { parseStringify } from "@/lib/utils";
import { cookies } from "next/headers";
import { avatarPlaceholderUrl } from "@/constants";
import { redirect } from "next/navigation";

const getUserByEmail = async (email: string) => {
  try {
    const { databases } = await createAdminClient();

    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("email", [email])],
    );

    return result.total > 0 ? result.documents[0] : null;
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    
    // Check if it's a schema-related error
    if (error && typeof error === 'object' && 'message' in error) {
      const errorMessage = (error as { message: string }).message;
      if (errorMessage.includes('Attribute not found in schema')) {
        throw new Error(
          'Database schema error: Please ensure your Appwrite users collection has the required attributes. ' +
          'Check APPWRITE_SETUP.md for detailed setup instructions.'
        );
      }
    }
    
    throw error;
  }
};

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);

    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
};

export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  try {
    const existingUser = await getUserByEmail(email);

    const accountId = await sendEmailOTP({ email });
    if (!accountId) throw new Error("Failed to send an OTP");

    if (!existingUser) {
      const { databases } = await createAdminClient();

      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        ID.unique(),
        {
          fullName,
          email,
          avatar: avatarPlaceholderUrl,
          accountId,
        },
      );
    }

    return parseStringify({ accountId });
  } catch (error) {
    console.error("Error in createAccount:", error);
    
    // Provide helpful error messages
    if (error && typeof error === 'object' && 'message' in error) {
      const errorMessage = (error as { message: string }).message;
      if (errorMessage.includes('Missing required parameter: "databaseId"')) {
        throw new Error(
          'Configuration error: Database ID is missing. Please check your environment variables.'
        );
      }
      if (errorMessage.includes('Attribute not found in schema')) {
        throw new Error(
          'Database schema error: Please ensure your Appwrite collections are properly configured. ' +
          'Check APPWRITE_SETUP.md for detailed setup instructions.'
        );
      }
    }
    
    handleError(error, "Failed to create account");
  }
};

export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();

    // First, try to create a session with the account ID and password
    const session = await account.createSession(accountId, password);

    // Set the session cookie
    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "lax", // Changed from strict to lax for better compatibility
      secure: process.env.NODE_ENV === "production", // Only secure in production
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    console.error("Error in verifySecret:", error);
    
    // Provide more specific error messages
    if (error && typeof error === 'object' && 'message' in error) {
      const errorMessage = (error as { message: string }).message;
      if (errorMessage.includes('Invalid token')) {
        throw new Error("Invalid OTP. Please check your email and try again.");
      }
      if (errorMessage.includes('User not found')) {
        throw new Error("User not found. Please sign up first.");
      }
    }
    
    handleError(error, "Failed to verify OTP");
  }
};

export const getCurrentUser = async () => {
  try {
    const { databases, account } = await createSessionClient();

    const result = await account.get();

    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", result.$id)],
    );

    if (user.total <= 0) return null;

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log("getCurrentUser error:", error);
    return null; // Return null instead of undefined to handle auth flow properly
  }
};

export const signOutUser = async () => {
  const { account } = await createSessionClient();

  try {
    await account.deleteSession("current");
    (await cookies()).delete("appwrite-session");
  } catch (error) {
    handleError(error, "Failed to sign out user");
  } finally {
    redirect("/sign-in");
  }
};

export const signInUser = async ({ email }: { email: string }) => {
  try {
    const existingUser = await getUserByEmail(email);

    // User exists, send OTP
    if (existingUser) {
      await sendEmailOTP({ email });
      return parseStringify({ accountId: existingUser.accountId });
    }

    return parseStringify({ accountId: null, error: "User not found" });
  } catch (error) {
    handleError(error, "Failed to sign in user");
  }
};
