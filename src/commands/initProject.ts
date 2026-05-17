import path from 'path';
import fs from 'fs-extra';
import { spinner } from '@clack/prompts';
import chalk from 'chalk';
import execa from 'execa';

export async function initProject(projectName: string) {
  const targetDir = path.resolve(process.cwd(), projectName);
  const s = spinner();

  try {
    const { note, outro, intro } = require('@clack/prompts');

    // 1. Create directory
    s.start(`Creating project directory: ${projectName}...`);
    if (await fs.pathExists(targetDir)) {
      s.stop(chalk.yellow(`Directory ${projectName} already exists.`), 1);
      process.exit(1);
    }
    await fs.mkdirp(targetDir);
    s.stop(chalk.green(`✔ Created directory: ${projectName}`));

    // 2. Copy templates
    s.start('Copying template files (Express, TypeScript, Biome, etc.)...');
    const templateDir = path.join(__dirname, '../src/templates/boilerplate');
    
    // We will use a helper to copy and process files later if needed, 
    // for now we'll do a simple copy and rename
    await copyAndProcessTemplates(templateDir, targetDir, projectName);
    s.stop(chalk.green('✔ Template files copied successfully.'));

    // 3. Initialize Git
    s.start('Initializing Git repository...');
    await execa('git', ['init'], { cwd: targetDir });
    s.stop(chalk.green('✔ Git repository initialized.'));

    // 4. Install dependencies using pnpm
    s.start('Installing dependencies with pnpm (this might take a moment)...');
    await execa('pnpm', ['install'], { cwd: targetDir, stdio: 'ignore' });
    s.stop(chalk.green('✔ Dependencies installed.'));

    const nextSteps = `cd ${projectName}
pnpm dev`;
    
    note(nextSteps, 'Next steps');
    
    outro(chalk.cyan.bold(`🚀 Project ${projectName} is ready! Happy coding!`));

  } catch (error: any) {
    s.stop(chalk.red('Failed to generate project.'), 1);
    console.error(error.message);
    process.exit(1);
  }
}

async function copyAndProcessTemplates(srcDir: string, destDir: string, projectName: string) {
  if (!(await fs.pathExists(srcDir))) {
     throw new Error(`Template directory not found: ${srcDir}. Make sure templates are included in the build or source.`);
  }

  const entries = await fs.readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    // Remove .txt extension from the copied files
    const destName = entry.name.endsWith('.txt') ? entry.name.slice(0, -4) : entry.name;
    const destPath = path.join(destDir, destName);

    if (entry.isDirectory()) {
      await fs.mkdirp(destPath);
      await copyAndProcessTemplates(srcPath, destPath, projectName);
    } else {
      let content = await fs.readFile(srcPath, 'utf8');
      
      // Basic templating
      content = content.replace(/\{\{projectName\}\}/g, projectName);
      
      await fs.writeFile(destPath, content, 'utf8');
    }
  }
}
