const { Client, Databases, Storage } = require('node-appwrite');

async function fixPermissions() {
  console.log('🔧 Fixing Appwrite Permissions...\n');

  // Load environment variables
  const fs = require('fs');
  const path = require('path');
  
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').replace(/^["']|["']$/g, '');
          process.env[key] = value;
        }
      }
    });
  }

  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
      .setKey(process.env.NEXT_APPWRITE_KEY);

    const databases = new Databases(client);
    const storage = new Storage(client);

    console.log('📊 Fixing Users Collection Permissions...');
    
    // Update users collection permissions
    await databases.updateCollection(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION,
      'users',
      [
        'create("users")'
      ],
      [
        'read("users")'
      ],
      [
        'update("users")'
      ],
      [
        'delete("users")'
      ]
    );
    console.log('   ✅ Users collection permissions updated');

    console.log('📁 Fixing Files Collection Permissions...');
    
    // Update files collection permissions
    await databases.updateCollection(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION,
      'files',
      [
        'create("users")'
      ],
      [
        'read("users")'
      ],
      [
        'update("users")'
      ],
      [
        'delete("users")'
      ]
    );
    console.log('   ✅ Files collection permissions updated');

    console.log('🗄️ Fixing Storage Bucket Permissions...');
    
    // Update storage bucket permissions
    await storage.updateBucket(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET,
      'Cloud Storage1',
      [
        'create("users")'
      ],
      [
        'read("users")'
      ],
      [
        'update("users")'
      ],
      [
        'delete("users")'
      ]
    );
    console.log('   ✅ Storage bucket permissions updated');

    console.log('\n🎉 All permissions have been fixed!');
    console.log('\n📖 Next steps:');
    console.log('   1. Try signing up again');
    console.log('   2. The authentication should work now');

  } catch (error) {
    console.error('\n❌ Failed to fix permissions:', error.message);
    
    if (error.message.includes('unauthorized')) {
      console.log('\n💡 Solution: Check your API key permissions');
      console.log('   - Go to Settings → API Keys in your Appwrite Console');
      console.log('   - Make sure your API key has these scopes:');
      console.log('     - databases.read, databases.write');
      console.log('     - storage.read, storage.write');
      console.log('     - users.read, users.write');
    }
  }
}

fixPermissions().catch(console.error);
