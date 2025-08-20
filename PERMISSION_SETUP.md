# Manual Permission Setup Guide

Since the automated script has issues, please set permissions manually in your Appwrite Console.

## 🔧 **Step 1: Fix Users Collection Permissions**

1. Go to your **Appwrite Console**
2. Navigate to **Database** → **Cloud Storage** → **users** collection
3. Click on **"Settings"** tab
4. Set these permissions:

### Read Permissions:
- Add: `users`

### Create Permissions:
- Add: `users`

### Update Permissions:
- Add: `users`

### Delete Permissions:
- Add: `users`

## 🔧 **Step 2: Add Files Collection Attributes**

1. Go to **Database** → **Cloud Storage** → **files** collection
2. Click on **"Attributes"** tab
3. Add these attributes one by one:

| Attribute | Type | Size | Required | Array |
|-----------|------|------|----------|-------|
| `type` | String | 50 | ✅ Yes | No |
| `name` | String | 255 | ✅ Yes | No |
| `url` | URL | 2000 | ✅ Yes | No |
| `extension` | String | 10 | ✅ Yes | No |
| `size` | Integer | - | ✅ Yes | No |
| `owner` | String | 255 | ✅ Yes | No |
| `accountId` | String | 255 | ✅ Yes | No |
| `users` | String | 255 | ❌ No | ✅ Yes |
| `bucketFileId` | String | 255 | ✅ Yes | No |

**How to add attributes:**
1. Click **"Create Attribute"**
2. Set the name, type, size, and required fields as shown above
3. For the `users` attribute, make sure to check **"Array"**
4. Click **"Create"**
5. Repeat for all 9 attributes

## 🔧 **Step 3: Fix Files Collection Permissions**

1. Go to **"Settings"** tab in your files collection
2. Set these permissions:

### Read Permissions:
- Add: `users`

### Create Permissions:
- Add: `users`

### Update Permissions:
- Add: `users`

### Delete Permissions:
- Add: `users`

## 🔧 **Step 4: Fix Storage Bucket Permissions**

1. Go to **Storage** → **Cloud Storage1** bucket
2. Click on **"Settings"** tab
3. Set these permissions:

### Read Permissions:
- Add: `users`

### Create Permissions:
- Add: `users`

### Update Permissions:
- Add: `users`

### Delete Permissions:
- Add: `users`

## 🔧 **Step 5: Check API Key Permissions**

1. Go to **Settings** → **API Keys**
2. Click on your API key
3. Make sure it has these scopes:
   - ✅ `databases.read`
   - ✅ `databases.write`
   - ✅ `users.read`
   - ✅ `users.write`
   - ✅ `storage.read`
   - ✅ `storage.write`
   - ✅ `sessions.write`

## 🔧 **Step 6: Enable Authentication**

1. Go to **Auth** → **Settings**
2. Enable **"Email/Password"** authentication method
3. Make sure **"Email verification"** is enabled

## ✅ **After Setting Permissions**

1. Run the setup check:
   ```bash
   npm run check-setup
   ```

2. Try signing up again:
   - Go to `http://localhost:3000/sign-up`
   - Create a new account
   - The authentication should work now

## 🚨 **Common Issues**

### "User not authorized" Error
- Make sure all collection permissions are set to `users`
- Check that your API key has the correct scopes

### "Invalid token" Error
- Make sure email/password authentication is enabled
- Check that email verification is properly configured

### "Permission denied" Error
- Verify all permissions are set correctly in the collections
- Make sure the storage bucket has the right permissions
