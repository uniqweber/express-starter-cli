import { spinner } from "@clack/prompts";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";

export async function generateDomain(domainName: string) {
  // Find project root by looking for package.json
  let currentDir = process.cwd();
  let projectRoot = currentDir;

  while (currentDir !== path.parse(currentDir).root) {
    if (await fs.pathExists(path.join(currentDir, "package.json"))) {
      projectRoot = currentDir;
      break;
    }
    currentDir = path.dirname(currentDir);
  }

  const targetDir = path.resolve(projectRoot, `src/domains/${domainName}`);
  const baseName = path.basename(domainName);
  const className = capitalize(baseName);

  const s = spinner();

  try {
    s.start(`Generating domain module: ${domainName}...`);

    if (await fs.pathExists(targetDir)) {
      s.stop(chalk.yellow(`Domain ${domainName} already exists.`), 1);
      process.exit(1);
    }

    await fs.mkdirp(targetDir);

    // 1. Interface
    const interfaceContent = `export interface I${className} {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreate${className}DTO {
  // Add creation fields here
}

export interface IUpdate${className}DTO {
  // Add update fields here
}
`;

    // 2. Service
    const serviceContent = `import type { ICreate${className}DTO, IUpdate${className}DTO } from './${baseName}.interface';

export class ${className}Service {
  public async create(data: ICreate${className}DTO) {
    // TODO: implement core infrastructure repository write query logic
    console.log(data);
  }

  public async findAll() {
    // TODO: implement entity read operations query mapping execution 
    console.log('findAll');
  }

  public async findOne(id: string) {
    // TODO: implement single model tracking logic configuration setup
    console.log(id);
  }

  public async update(id: string, data: IUpdate${className}DTO) {
    // TODO: implement single data modifications process trace pipeline 
    console.log(id, data);
  }

  public async remove(id: string) {
    // TODO: implement infrastructure hard or soft deletion trace 
    console.log(id);
  }
}
`;

    // 3. Controller
    const controllerContent = `import type { RequestHandler } from 'express';
import { ${className}Service } from './${baseName}.service';

// Global execution instances generation tracking mapping for functional operations
const ${baseName}Service = new ${className}Service();

export const create: RequestHandler = async (req, res) => {
  const data = await ${baseName}Service.create(req.body);
  res.status(201).json({ success: true, data });
};

export const findAll: RequestHandler = async (_req, res) => {
  const data = await ${baseName}Service.findAll();
  res.status(200).json({ success: true, data });
};

export const findOne: RequestHandler = async (req, res) => {
  const data = await ${baseName}Service.findOne(req.params.id as string);
  res.status(200).json({ success: true, data });
};

export const update: RequestHandler = async (req, res) => {
  const data = await ${baseName}Service.update(req.params.id as string, req.body);
  res.status(200).json({ success: true, data });
};

export const remove: RequestHandler = async (req, res) => {
  await ${baseName}Service.remove(req.params.id as string);
  res.status(200).json({ success: true, message: 'Resource deleted successfully' });
};
`;

    // 4. Routes
    const routesContent = `import { Router } from 'express';
import * as ${className}Controller from './${baseName}.controller';

const ${baseName}Router: Router = Router();

${baseName}Router
  .route('/')
  .post(${className}Controller.create)
  .get(${className}Controller.findAll);

${baseName}Router
  .route('/:id')
  .get(${className}Controller.findOne)
  .put(${className}Controller.update)
  .delete(${className}Controller.remove);

export default ${baseName}Router;
`;

    // 5. Schema
    const schemaContent = `// Database queries and schema definitions for ${className}
export const create${className}Query = \`INSERT INTO ${baseName}s ...\`;
export const get${className}Query = \`SELECT * FROM ${baseName}s WHERE id = $1\`;
`;

    // Write files
    await fs.writeFile(
      path.join(targetDir, `${baseName}.interface.ts`),
      interfaceContent,
    );
    await fs.writeFile(
      path.join(targetDir, `${baseName}.service.ts`),
      serviceContent,
    );
    await fs.writeFile(
      path.join(targetDir, `${baseName}.controller.ts`),
      controllerContent,
    );
    await fs.writeFile(
      path.join(targetDir, `${baseName}.route.ts`),
      routesContent,
    );
    await fs.writeFile(
      path.join(targetDir, `${baseName}.schema.ts`),
      schemaContent,
    );

    s.stop(chalk.green(`✔ Domain '${domainName}' successfully generated!`));

    const nextSteps = `import ${baseName}Router from './domains/${domainName}/${baseName}.route';\n\napp.use('/${baseName}', ${baseName}Router);`;

    const { note } = require("@clack/prompts");
    note(
      nextSteps,
      chalk.cyan(
        `➤ Don't forget to register ${baseName}Router in your src/app.ts:`,
      ),
    );
  } catch (error: any) {
    s.stop(chalk.red(`Failed to generate domain ${domainName}.`), 1);
    console.error(error.message);
    process.exit(1);
  }
}

function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
