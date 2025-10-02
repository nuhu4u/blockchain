#!/usr/bin/env node

/**
 * Guard Install Script - Prevents accidental npm install in frozen environment
 * 
 * This script blocks direct npm install commands unless they're part of the
 * update:once workflow. It ensures the frozen environment stays locked.
 */

const fs = require('fs');
const path = require('path');

// Check if this is being called from within the update:once script
function isUpdateOnceScript() {
  // Check for the .allow-install temporary file
  const allowInstallPath = path.join(__dirname, '.allow-install');
  if (fs.existsSync(allowInstallPath)) {
    return true;
  }
  
  // Check if we're in a script context that includes update:once
  const scriptName = process.env.npm_lifecycle_event;
  if (scriptName === 'update:once') {
    return true;
  }
  
  // Check if the command line contains update:once
  const commandLine = process.argv.join(' ');
  if (commandLine.includes('update:once')) {
    return true;
  }
  
  return false;
}

// Check if npm-shrinkwrap.json exists (indicating frozen environment)
function isFrozenEnvironment() {
  const shrinkwrapPath = path.join(__dirname, 'npm-shrinkwrap.json');
  return fs.existsSync(shrinkwrapPath);
}

// Main guard logic
function main() {
  // Allow update:once script to proceed
  if (isUpdateOnceScript()) {
    console.log('✅ update:once script detected - allowing npm install');
    return;
  }
  
  // If not frozen, allow normal installs
  if (!isFrozenEnvironment()) {
    console.log('ℹ️  Environment not frozen - allowing npm install');
    return;
  }
  
  // Frozen environment detected - block direct installs
  console.error('🚫 FROZEN ENVIRONMENT DETECTED');
  console.error('');
  console.error('This project uses a frozen dependency environment.');
  console.error('Direct npm install is blocked to maintain consistency.');
  console.error('');
  console.error('To update dependencies:');
  console.error('  npm run update:once');
  console.error('');
  console.error('To install frozen dependencies:');
  console.error('  npm ci');
  console.error('');
  console.error('For development:');
  console.error('  npm run dev');
  console.error('');
  
  process.exit(1);
}

// Only run if this script is executed directly
if (require.main === module) {
  main();
}

module.exports = { isUpdateOnceScript, isFrozenEnvironment };
