import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join, resolve } from 'path';

const log = (msg) => {
  console.log(`[BUILD] ${msg}`);
};

const runCommand = (command, description, cwd = process.cwd()) => {
  try {
    log(`Starting: ${description}`);
    execSync(command, { stdio: 'inherit', cwd: resolve(cwd), shell: true });
    log(`✅ Completed: ${description}`);
    return true;
  } catch (error) {
    log(`❌ Failed: ${description}`);
    console.error(error.message);
    return false;
  }
};

const rootDir = process.cwd();
log('🚀 Starting Heroku build process...');
log(`   Working directory: ${rootDir}`);

// Step 1: Install root dependencies
if (!runCommand('npm install', 'Install root dependencies', rootDir)) {
  console.error('❌ Build failed at: Root dependencies installation');
  process.exit(1);
}

// Step 2: Install server dependencies
const serverDir = join(rootDir, 'server');
if (!runCommand('npm install', 'Install server dependencies', serverDir)) {
  console.error('❌ Build failed at: Server dependencies installation');
  process.exit(1);
}

// Step 3: Install client dependencies
const clientDir = join(rootDir, 'client');
if (!runCommand('NPM_CONFIG_PRODUCTION=false npm install', 'Install client dependencies', clientDir)) {
  console.error('❌ Build failed at: Client dependencies installation');
  process.exit(1);
}

// Step 4: Build React app
if (!runCommand('npm run build', 'Build React app', clientDir)) {
  console.error('❌ Build failed at: React app build');
  process.exit(1);
}

// Step 5: Verify build
log('🔍 Verifying build...');
const possiblePaths = [
  join(rootDir, 'client', 'dist'),
  join(rootDir, '..', 'client', 'dist'),
  '/app/client/dist',
];

let distPath = null;
for (const possiblePath of possiblePaths) {
  const normalizedPath = join(possiblePath);
  log(`   Checking: ${normalizedPath}`);
  
  if (existsSync(normalizedPath)) {
    const indexPath = join(normalizedPath, 'index.html');
    if (existsSync(indexPath)) {
      distPath = normalizedPath;
      log(`   ✅ Found build at: ${distPath}`);
      break;
    }
  }
}

if (!distPath) {
  console.error('❌ Build verification failed: dist folder not found');
  console.error('   Checked paths:', possiblePaths);
  process.exit(1);
}

log('✅ Heroku build process completed successfully!');
log(`   Build location: ${distPath}`);

