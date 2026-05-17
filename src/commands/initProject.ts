import path from 'path';
import fs from 'fs-extra';
import { spinner, select, isCancel, cancel } from '@clack/prompts';
import chalk from 'chalk';
import execa from 'execa';

export async function initProject(projectName: string) {
  const targetDir = path.resolve(process.cwd(), projectName);

  // 1. Prompt for package manager first, before showing spinners
  const packageManager = await select({
    message: 'Which package manager would you like to use for installing dependencies?',
    options: [
      { value: 'pnpm', label: 'pnpm (Recommended)' },
      { value: 'npm', label: 'npm' },
      { value: 'yarn', label: 'yarn' },
      { value: 'bun', label: 'bun' },
      { value: 'none', label: 'Skip installation (Install manually later)' },
    ],
  });

  if (isCancel(packageManager)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  const s = spinner();

  try {
    const { note, outro } = require('@clack/prompts');

    // 2. Create directory
    s.start(`Creating project directory: ${projectName}...`);
    if (await fs.pathExists(targetDir)) {
      s.stop(chalk.yellow(`Directory ${projectName} already exists.`), 1);
      process.exit(1);
    }
    await fs.mkdirp(targetDir);
    s.stop(chalk.green(`✔ Created directory: ${projectName}`));

    // 3. Copy templates
    s.start('Copying template files (Express, TypeScript, Biome, etc.)...');
    const templateDir = path.join(__dirname, '../src/templates/boilerplate');
    
    await copyAndProcessTemplates(templateDir, targetDir, projectName);
    s.stop(chalk.green('✔ Template files copied successfully.'));

    // 4. Initialize Git
    s.start('Initializing Git repository...');
    await execa('git', ['init'], { cwd: targetDir });
    s.stop(chalk.green('✔ Git repository initialized.'));

    // 5. Install dependencies using selected package manager
    const pm = packageManager as string;
    if (pm !== 'none') {
      s.start(`Installing dependencies with ${pm} (this might take a moment)...`);
      await execa(pm, ['install'], { cwd: targetDir, stdio: 'ignore' });
      s.stop(chalk.green(`✔ Dependencies installed successfully using ${pm}.`));
    } else {
      s.stop(chalk.yellow('⚠ Skipped dependency installation.'));
    }

    let runCmd = 'pnpm dev';
    if (pm === 'npm') {
      runCmd = 'npm run dev';
    } else if (pm === 'yarn') {
      runCmd = 'yarn dev';
    } else if (pm === 'bun') {
      runCmd = 'bun dev';
    }

    const nextSteps = `cd ${projectName}
${pm === 'none' ? 'pnpm install\npnpm dev' : runCmd}`;
    
    note(nextSteps, chalk.blueBright('ℹ Next steps to start your server:'));
    
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
