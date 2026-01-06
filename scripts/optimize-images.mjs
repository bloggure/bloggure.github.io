#!/usr/bin/env node

import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import { glob } from 'glob';
import { promises as fs } from 'fs';

async function optimizeImages() {
  try {
    console.log('🔍 Searching for images to optimize...');
    
    // Find all PNG, JPG, and JPEG files
    const files = await glob('images/**/*.{png,jpg,jpeg}', {
      nodir: true,
      absolute: false
    });
    
    if (files.length === 0) {
      console.log('✅ No images found to optimize.');
      return;
    }
    
    console.log(`📸 Found ${files.length} images to optimize...`);
    
    for (const file of files) {
      try {
        console.log(`🔧 Optimizing: ${file}`);
        
        const fileContent = await fs.readFile(file);
        const optimizedContent = await imagemin.buffer(fileContent, {
          plugins: [
            imageminMozjpeg({ quality: 85 }),
            imageminPngquant({ quality: [0.6, 0.8] })
          ]
        });
        
        await fs.writeFile(file, optimizedContent);
        console.log(`✅ Optimized: ${file}`);
        
      } catch (error) {
        console.error(`❌ Failed to optimize ${file}:`, error.message);
      }
    }
    
    console.log('🎉 Image optimization complete!');
    
  } catch (error) {
    console.error('❌ Image optimization failed:', error.message);
    process.exit(1);
  }
}

optimizeImages();