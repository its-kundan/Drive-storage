# Quick Setup Guide - Fix the "Attribute not found" Error

## The Problem
You're getting this error: `"Invalid query: Attribute not found in schema: email"`

This means your Appwrite database collection doesn't have the required attributes.

## Quick Fix (5 minutes)

### Step 1: Run the Setup Check
```bash
npm run check-setup
```

This will tell you exactly what's missing.

### Step 2: Go to Appwrite Console
1. Visit [cloud.appwrite.io](https://cloud.appwrite.io/)
2. Log in and open your project

### Step 3: Create Users Collection (if missing)
1. Go to **Database** → Your database
2. Click **"Create Collection"**
3. Name: `users`
4. Copy the Collection ID to your `.env.local`

### Step 4: Add Required Attributes to Users Collection
In your `users` collection, add these attributes:

| Attribute | Type | Size | Required |
|-----------|------|------|----------|
| `fullName` | String | 255 | ✅ Yes |
| `email` | String | 320 | ✅ Yes |
| `avatar` | URL | 2000 | ✅ Yes |
| `accountId` | String | 255 | ✅ Yes |

**How to add attributes:**
1. Click on your `users` collection
2. Go to **"Attributes"** tab
3. Click **"Create Attribute"**
4. Add each attribute with the settings above

### Step 5: Create Indexes
1. Go to **"Indexes"** tab in your users collection
2. Click **"Create Index"**
3. Add these indexes:
   - **Key**: `email`, **Type**: Unique, **Attributes**: `email`
   - **Key**: `accountId`, **Type**: Unique, **Attributes**: `accountId`

### Step 6: Set Permissions
1. Go to **"Settings"** tab in your users collection
2. Set all permissions to `users`:
   - Read: `users`
   - Create: `users`
   - Update: `users`
   - Delete: `users`

### Step 7: Create Files Collection (if missing)
1. Go back to your database
2. Click **"Create Collection"**
3. Name: `files`
4. Copy the Collection ID to your `.env.local`

### Step 8: Add Files Collection Attributes
Add these attributes to your `files` collection:

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

### Step 9: Create Storage Bucket (if missing)
1. Go to **Storage** in your Appwrite console
2. Click **"Create Bucket"**
3. Name: `files`
4. Set permissions to `users`
5. Copy the Bucket ID to your `.env.local`

### Step 10: Test Again
```bash
npm run check-setup
```

## Common Issues & Solutions

### ❌ "Collection not found"
- Make sure you created the collection
- Check that the Collection ID in `.env.local` is correct

### ❌ "Database not found"
- Make sure you created the database
- Check that the Database ID in `.env.local` is correct

### ❌ "Attribute not found"
- Make sure you added all required attributes
- Check that attribute names match exactly (case-sensitive)

### ❌ "Permission denied"
- Set all permissions to `users` on collections and bucket

## Your .env.local should look like this:
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE=your_database_id
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=your_users_collection_id
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=your_files_collection_id
NEXT_PUBLIC_APPWRITE_BUCKET=your_bucket_id
NEXT_APPWRITE_KEY=your_secret_key
```

## After Setup
1. Run `npm run dev`
2. Try signing up with a new account
3. The error should be gone!

## Still having issues?
Run the setup check and share the output:
```bash
npm run check-setup
```
