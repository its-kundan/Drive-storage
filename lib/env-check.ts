// Environment validation utility
export const validateEnvVars = () => {
  const requiredEnvVars = [
    'NEXT_PUBLIC_APPWRITE_ENDPOINT',
    'NEXT_PUBLIC_APPWRITE_PROJECT',
    'NEXT_PUBLIC_APPWRITE_DATABASE',
    'NEXT_PUBLIC_APPWRITE_USERS_COLLECTION',
    'NEXT_PUBLIC_APPWRITE_FILES_COLLECTION',
    'NEXT_PUBLIC_APPWRITE_BUCKET',
    'NEXT_APPWRITE_KEY',
  ];

  const missingVars: string[] = [];

  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  });

  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.error('\n📋 Please check your .env.local file and ensure all variables are set.');
    console.error('📖 Refer to APPWRITE_SETUP.md for detailed setup instructions.');
    return false;
  }

  console.log('✅ All required environment variables are set.');
  return true;
};

export const getEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not set`);
  }
  return value;
};
