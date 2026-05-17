#!/usr/bin/env node
import { Command } from 'commander';
import { intro, outro, text, isCancel, cancel } from '@clack/prompts';
import chalk from 'chalk';
import { initProject } from './commands/initProject';

import { generateDomain } from './commands/generate';

const program = new Command();

program
  .name('generate-expressts')
  .description('CLI to generate a domain driven architecture based ExpressJS starter project with typescript')
  .version('1.0.0');

program
  .command('new')
  .description('Generate a new Express.js project')
  .argument('[project-name]', 'Name of the project')
  .action(async (projectNameArg) => {
    intro(`${chalk.cyan.bold('@uniqweber/express-starter-cli')} ${chalk.dim('Generate a new express project')}`);

    let projectName = projectNameArg;

    if (!projectName) {
      const result = await text({
        message: 'What is the name of your project?',
        placeholder: 'my-awesome-api',
        validate(value) {
          if (value.length === 0) return 'Project name is required!';
        },
      });

      if (isCancel(result)) {
        cancel('Operation cancelled.');
        process.exit(0);
      }
      
      projectName = result;
    }

    await initProject(projectName);
  });

program
  .command('generate')
  .alias('g')
  .description('Generate a new domain module (controller, service, routes, interface)')
  .argument('<domain-name>', 'Name of the domain (e.g. users, products)')
  .action(async (domainName) => {
    intro(`${chalk.magenta.bold('@uniqweber/express-starter-cli')} ${chalk.dim('Generate a new domain module')}`);
    console.log(chalk.gray('│'));
    await generateDomain(domainName);
    outro();
  });

if (process.argv.length <= 2) {
  program.outputHelp();
  process.exit(0);
}

program.parse(process.argv);
