import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

async function createNoJekyll() {
  try {
    const distPath = join(process.cwd(), 'dist');
    const noJekyllPath = join(distPath, '.nojekyll');
    
    try {
      await mkdir(distPath, { recursive: true });
    } catch (err) {
      // Directory might already exist, that's fine
    }
    
    await writeFile(noJekyllPath, '');
    console.log('.nojekyll file created successfully');
  } catch (error) {
    console.error('Error creating .nojekyll file:', error);
    process.exit(0); // Don't fail the build if this fails
  }
}

createNoJekyll();
