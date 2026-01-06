#!/usr/bin/env node

import { execSync } from 'child_process';
import { glob } from 'glob';
import { promises as fs } from 'fs';
import { basename, dirname, join } from 'path';

async function optimizeSVG() {
  try {
    console.log('🔍 Searching for SVG files to optimize...');
    
    // Find all SVG files
    const files = await glob('**/*.svg', {
      nodir: true,
      absolute: false,
      ignore: ['node_modules/**', '_site/**', '.git/**']
    });
    
    if (files.length === 0) {
      console.log('✅ No SVG files found to optimize.');
      return;
    }
    
    console.log(`📸 Found ${files.length} SVG files to optimize...`);
    
    let optimizedCount = 0;
    let skippedCount = 0;
    
    for (const file of files) {
      try {
        console.log(`🔧 Optimizing: ${file}`);
        
        // Use svgo to optimize the file
        execSync(`npx svgo "${file}" --output="${file}"`, {
          stdio: 'pipe',
          encoding: 'utf-8'
        });
        
        console.log(`✅ Optimized: ${file}`);
        optimizedCount++;
        
      } catch (error) {
        console.warn(`⚠️  Skipped ${file} (complex file or already optimized):`, error.message);
        skippedCount++;
      }
    }
    
    console.log(`🎉 SVG optimization complete! ${optimizedCount} optimized, ${skippedCount} skipped`);
    
  } catch (error) {
    console.error('❌ SVG optimization failed:', error.message);
    process.exit(1);
  }
}

optimizeSVG();