# 🚀 Quick Setup Guide - Fix All Issues

## 🎯 **Current Issues**
1. **Files collection missing ALL required attributes** (9 attributes)
2. **Permissions not set correctly**
3. **Authentication not working**

## 🔧 **Step 1: Add Files Collection Attributes**

**Go to your Appwrite Console → Database → Cloud Storage → files collection → Attributes tab**

Add these 9 attributes one by one:

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

**Important:**
- For `users` attribute, check **"Array"**
- For `size` attribute, use **Integer** type
- For `url` attribute, use **URL** type

## 🔧 **Step 2: Set Collection Permissions**

### Users Collection Permissions
1. Go to **Database → Cloud Storage → users collection → Settings tab**
2. Set all permissions to: `users`

### Files Collection Permissions  
1. Go to **Database → Cloud Storage → files collection → Settings tab**
2. Set all permissions to: `users`

### Storage Bucket Permissions
1. Go to **Storage → Cloud Storage1 bucket → Settings tab**
2. Set all permissions to: `users`

## 🔧 **Step 3: Check API Key Permissions**

1. Go to **Settings → API Keys**
2. Click on your API key
3. Make sure it has these scopes:
   - ✅ `databases.read`
   - ✅ `databases.write`
   - ✅ `users.read`
   - ✅ `users.write`
   - ✅ `storage.read`
   - ✅ `storage.write`
   - ✅ `sessions.write`

## 🔧 **Step 4: Enable Authentication**

1. Go to **Auth → Settings**
2. Enable **"Email/Password"** authentication method
3. Make sure **"Email verification"** is enabled

## ✅ **After Setup**

1. **Run the setup check:**
   ```bash
   npm run check-setup
   ```

2. **You should see all attributes as ✅**

3. **Try signing up again:**
   - Go to `http://localhost:3000/sign-up`
   - Create a new account

## 🚨 **If Still Having Issues**

1. **Clear browser cookies** and try again
2. **Restart the development server:**
   ```bash
   npm run dev
   ```
3. **Check the console for any remaining errors**

## 📞 **Need Help?**

If you're still having issues after following these steps, please:
1. Run `npm run check-setup` and share the output
2. Share any error messages from the browser console
3. Let me know which step you're stuck on
