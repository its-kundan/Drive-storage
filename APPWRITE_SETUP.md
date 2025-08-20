# Appwrite Setup Guide

This guide will help you set up your Appwrite project with the required collections and attributes.

## Prerequisites

1. Create an account at [Appwrite Cloud](https://cloud.appwrite.io/)
2. Create a new project
3. Note down your project ID

## Step 1: Environment Variables

Copy the `env.example` file to `.env.local` and update with your actual values:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id_here
NEXT_PUBLIC_APPWRITE_DATABASE=your_database_id_here
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=your_users_collection_id_here
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=your_files_collection_id_here
NEXT_PUBLIC_APPWRITE_BUCKET=your_bucket_id_here
NEXT_APPWRITE_KEY=your_secret_key_here
```

## Step 2: Create Database

1. Go to your Appwrite Console
2. Navigate to "Database"
3. Click "Create Database"
4. Name it "drive_storage" (or any name you prefer)
5. Copy the Database ID to your `.env.local` file

## Step 3: Create Users Collection

1. In your database, click "Create Collection"
2. Name it "users"
3. Copy the Collection ID to your `.env.local` file as `NEXT_PUBLIC_APPWRITE_USERS_COLLECTION`

### Users Collection Attributes:

| Attribute Key | Type   | Size | Required | Array | Default |
|---------------|--------|------|----------|-------|---------|
| `fullName`    | String | 255  | Yes      | No    | -       |
| `email`       | String | 320  | Yes      | No    | -       |
| `avatar`      | URL    | 2000 | Yes      | No    | -       |
| `accountId`   | String | 255  | Yes      | No    | -       |

### Users Collection Indexes:

| Key       | Type   | Attributes |
|-----------|--------|------------|
| `email`   | Unique | email      |
| `accountId` | Unique | accountId |

### Users Collection Permissions:

- **Read**: `users`
- **Create**: `users`
- **Update**: `users`
- **Delete**: `users`

## Step 4: Create Files Collection

1. In your database, click "Create Collection"
2. Name it "files"
3. Copy the Collection ID to your `.env.local` file as `NEXT_PUBLIC_APPWRITE_FILES_COLLECTION`

### Files Collection Attributes:

| Attribute Key  | Type     | Size | Required | Array | Default |
|----------------|----------|------|----------|-------|---------|
| `type`         | String   | 50   | Yes      | No    | -       |
| `name`         | String   | 255  | Yes      | No    | -       |
| `url`          | URL      | 2000 | Yes      | No    | -       |
| `extension`    | String   | 10   | Yes      | No    | -       |
| `size`         | Integer  | -    | Yes      | No    | -       |
| `owner`        | String   | 255  | Yes      | No    | -       |
| `accountId`    | String   | 255  | Yes      | No    | -       |
| `users`        | String   | 255  | No       | Yes   | -       |
| `bucketFileId` | String   | 255  | Yes      | No    | -       |

### Files Collection Indexes:

| Key         | Type | Attributes |
|-------------|------|------------|
| `owner`     | Key  | owner      |
| `accountId` | Key  | accountId  |
| `type`      | Key  | type       |

### Files Collection Permissions:

- **Read**: `users`
- **Create**: `users`
- **Update**: `users`
- **Delete**: `users`

## Step 5: Create Storage Bucket

1. Navigate to "Storage" in your Appwrite Console
2. Click "Create Bucket"
3. Name it "files" (or any name you prefer)
4. Set the following permissions:
   - **Read**: `users`
   - **Create**: `users`
   - **Update**: `users`
   - **Delete**: `users`
5. Set file size limit to 50MB (50000000 bytes)
6. Copy the Bucket ID to your `.env.local` file

## Step 6: Generate API Key

1. Navigate to "Settings" > "API Keys" in your Appwrite Console
2. Click "Create API Key"
3. Name it "StorageApp Server Key"
4. Set the following scopes:
   - `databases.read`
   - `databases.write`
   - `users.read`
   - `users.write`
   - `storage.read`
   - `storage.write`
   - `sessions.write`
5. Copy the generated key to your `.env.local` file as `NEXT_APPWRITE_KEY`

## Step 7: Configure Authentication

1. Navigate to "Auth" in your Appwrite Console
2. Go to "Settings" tab
3. Enable "Email/Password" authentication method
4. Configure email templates if needed

## Step 8: Test the Setup

1. Make sure all environment variables are set in `.env.local`
2. Run `npm run dev`
3. Try to sign up with a new account
4. Check if the user is created in your Appwrite database

## Troubleshooting

### "Attribute not found in schema" Error
- Make sure all required attributes are created in the collections
- Check that attribute names match exactly (case-sensitive)
- Verify that the collection IDs in your `.env.local` are correct

### "No session" Error
- This usually happens when trying to access protected routes without authentication
- Make sure you're signed in before accessing the dashboard
- Check that the session cookies are being set correctly

### "User not found" Error
- Make sure the user was created successfully in the users collection
- Check that the accountId matches between the auth and database records

## Environment Variables Summary

Your final `.env.local` should look like this (with your actual IDs):

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=674abc123def456789
NEXT_PUBLIC_APPWRITE_DATABASE=674def456abc789123
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=674ghi789def123456
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=674jkl123ghi456789
NEXT_PUBLIC_APPWRITE_BUCKET=674mno456jkl789123
NEXT_APPWRITE_KEY=your_very_long_secret_key_here
```
