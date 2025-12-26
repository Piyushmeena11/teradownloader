#!/usr/bin/env node
// Start script that ensures we're in the correct directory
import { spawn } from 'child_process';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const serverDir = resolve(__dirname, 'server');
const serverIndex = join(serverDir, 'index.js');

// Verify server directory exists
if (!existsSync(serverDir)) {
  console.error(`❌ Server directory not found: ${serverDir}`);
  process.exit(1);
}

// Verify server index exists
if (!existsSync(serverIndex)) {
  console.error(`❌ Server index.js not found: ${serverIndex}`);
  process.exit(1);
}

// Spawn node process in the server directory
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
  process.exit(code || 0);
});

