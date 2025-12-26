#!/usr/bin/env node
// Wrapper script to start the server with better error handling
import { spawn } from 'child_process';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serverDir = resolve(__dirname, 'server');
const serverIndex = join(serverDir, 'index.js');

console.log('🚀 Starting server...');
console.log(`   Root directory: ${__dirname}`);
console.log(`   Server directory: ${serverDir}`);
console.log(`   Server index: ${serverIndex}`);

// Check if server directory exists
if (!existsSync(serverDir)) {
  console.error(`❌ Server directory not found: ${serverDir}`);
  process.exit(1);
}

// Check if server index.js exists
if (!existsSync(serverIndex)) {
  console.error(`❌ Server index.js not found: ${serverIndex}`);
  process.exit(1);
}

// Check if node_modules exists in server directory
const serverNodeModules = join(serverDir, 'node_modules');
if (!existsSync(serverNodeModules)) {
  console.error(`❌ Server node_modules not found: ${serverNodeModules}`);
  console.error('   Please ensure dependencies are installed');
  process.exit(1);
}

// Change to server directory and run node
process.chdir(serverDir);
console.log(`✅ Changed to server directory: ${process.cwd()}`);

// Spawn node process to run the server
const nodeProcess = spawn('node', ['index.js'], {
  cwd: serverDir,
  stdio: 'inherit',
  env: process.env,
  shell: false
});

nodeProcess.on('error', (error) => {
  console.error('❌ Failed to spawn node process:', error);
  process.exit(1);
});

nodeProcess.on('exit', (code) => {
  if (code !== 0) {
    console.error(`❌ Server process exited with code ${code}`);
    process.exit(code || 1);
  }
});

