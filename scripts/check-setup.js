const { Client, Databases, Storage } = require('node-appwrite');

// This script helps verify your Appwrite setup
async function checkSetup() {
  console.log('🔍 Checking Appwrite Setup...\n');

  // Check environment variables
  const requiredVars = [
    'NEXT_PUBLIC_APPWRITE_ENDPOINT',
    'NEXT_PUBLIC_APPWRITE_PROJECT',
    'NEXT_PUBLIC_APPWRITE_DATABASE',
    'NEXT_PUBLIC_APPWRITE_USERS_COLLECTION',
    'NEXT_PUBLIC_APPWRITE_FILES_COLLECTION',
    'NEXT_PUBLIC_APPWRITE_BUCKET',
    'NEXT_APPWRITE_KEY'
  ];

  console.log('📋 Environment Variables:');
  let allVarsSet = true;
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      console.log(`   ✅ ${varName}: ${value.substring(0, 20)}...`);
    } else {
      console.log(`   ❌ ${varName}: MISSING`);
      allVarsSet = false;
    }
  });

  if (!allVarsSet) {
    console.log('\n❌ Please set all required environment variables in .env.local');
    return;
  }

  console.log('\n🔗 Testing Appwrite Connection...');

  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
      .setKey(process.env.NEXT_APPWRITE_KEY);

    const databases = new Databases(client);
    const storage = new Storage(client);

    // Test database connection
    console.log('📊 Testing Database...');
    const database = await databases.get(process.env.NEXT_PUBLIC_APPWRITE_DATABASE);
    console.log(`   ✅ Database "${database.name}" found`);

    // Test users collection
    console.log('👥 Testing Users Collection...');
    const usersCollection = await databases.getCollection(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION
    );
    console.log(`   ✅ Users collection "${usersCollection.name}" found`);

    // Check users collection attributes
    const usersAttributes = await databases.listAttributes(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION
    );

    const requiredAttributes = ['fullName', 'email', 'avatar', 'accountId'];
    console.log('   📝 Checking required attributes:');
    
    requiredAttributes.forEach(attr => {
      const found = usersAttributes.attributes.find(a => a.key === attr);
      if (found) {
        console.log(`      ✅ ${attr} (${found.type})`);
      } else {
        console.log(`      ❌ ${attr} - MISSING`);
      }
    });

    // Test files collection
    console.log('\n📁 Testing Files Collection...');
    const filesCollection = await databases.getCollection(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION
    );
    console.log(`   ✅ Files collection "${filesCollection.name}" found`);

    // Check files collection attributes
    const filesAttributes = await databases.listAttributes(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION
    );

    const requiredFilesAttributes = ['type', 'name', 'url', 'extension', 'size', 'owner', 'accountId', 'users', 'bucketFileId'];
    console.log('   📝 Checking required attributes:');
    
    requiredFilesAttributes.forEach(attr => {
      const found = filesAttributes.attributes.find(a => a.key === attr);
      if (found) {
        console.log(`      ✅ ${attr} (${found.type})`);
      } else {
        console.log(`      ❌ ${attr} - MISSING`);
      }
    });

    // Test storage bucket
    console.log('\n🗄️ Testing Storage Bucket...');
    const bucket = await storage.getBucket(process.env.NEXT_PUBLIC_APPWRITE_BUCKET);
    console.log(`   ✅ Storage bucket "${bucket.name}" found`);

    console.log('\n🎉 All checks passed! Your Appwrite setup looks good.');
    console.log('\n📖 Next steps:');
    console.log('   1. Make sure all required attributes are created in your collections');
    console.log('   2. Set proper permissions (users) on collections and bucket');
    console.log('   3. Try signing up with a new account');

  } catch (error) {
    console.error('\n❌ Setup check failed:', error.message);
    
    if (error.message.includes('Attribute not found')) {
      console.log('\n💡 Solution: Create the missing attributes in your Appwrite collections');
      console.log('   - Go to your Appwrite Console');
      console.log('   - Navigate to Database → Your Collection');
      console.log('   - Add the required attributes (fullName, email, avatar, accountId)');
    }
    
    if (error.message.includes('Collection not found')) {
      console.log('\n💡 Solution: Create the missing collection in your Appwrite database');
    }
    
    if (error.message.includes('Database not found')) {
      console.log('\n💡 Solution: Create the database or check your database ID');
    }
  }
}

// Load environment variables from .env.local
const fs = require('fs');
const path = require('path');

function loadEnvFile() {
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
}

loadEnvFile();

// Run the check
checkSetup().catch(console.error);
