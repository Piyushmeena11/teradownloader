import { existsSync } from 'fs';
import { join } from 'path';

console.log('🔍 Starting build verification...');
console.log('   Current working directory:', process.cwd());

// Try multiple possible paths
const cwd = process.cwd();
const possiblePaths = [
  join(cwd, 'client', 'dist'),        // From root: ./client/dist
  join(cwd, '..', 'client', 'dist'),  // One level up: ../client/dist
  '/app/client/dist',                  // Absolute Heroku path
];

console.log('   Checking paths:', possiblePaths);

let distPath = null;
for (const possiblePath of possiblePaths) {
  const normalizedPath = join(possiblePath);
  console.log(`   → Checking: ${normalizedPath}`);
  
  if (existsSync(normalizedPath)) {
    const indexPath = join(normalizedPath, 'index.html');
    console.log(`      ✓ Directory exists`);
    
    if (existsSync(indexPath)) {
      distPath = normalizedPath;
      console.log(`      ✓ index.html found!`);
      break;
    } else {
      console.log(`      ✗ index.html not found`);
    }
  } else {
    console.log(`      ✗ Path does not exist`);
  }
}

if (distPath) {
  console.log(`✅ Build verification successful!`);
  console.log(`   Build location: ${distPath}`);
  process.exit(0);
} else {
  console.error(`❌ Build verification failed!`);
  console.error(`   The dist folder was not found in any of the checked paths.`);
  console.error(`   This usually means:`);
  console.error(`   1. The build process failed before creating the dist folder`);
  console.error(`   2. The build output is in an unexpected location`);
  console.error(`   3. There was an error during the Vite build process`);
  console.error(`   Please check the build logs above for Vite build errors.`);
  process.exit(1);
}

