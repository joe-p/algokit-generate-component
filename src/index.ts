import nunjucks from 'nunjucks';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const input = './test/Dao.json';
const outDir = path.join('test', 'components');

nunjucks.configure('templates');
const appSpec = JSON.parse(readFileSync(input, 'utf8'));
const className = appSpec.contract.name;
const imports: string[] = [];

Object.keys(appSpec.hints).forEach((methodSignature: string) => {
  const methodName = methodSignature.split('(')[0];

  const callConfig = appSpec.hints[methodSignature].call_config;
  if (!['CALL', 'CREATE'].includes(callConfig.no_op)) return;

  const { args } = appSpec.contract.methods.find((m: {name: string}) => m.name === methodName);

  const capitalizedMethodName = methodName.charAt(0).toUpperCase() + methodName.slice(1);
  const fullName = `${className}${capitalizedMethodName}`;
  imports.push(fullName);

  const result = nunjucks.render('method.tsx.njk', {
    className,
    methodName,
    methodSignature,
    clientPath: `../${className}Client.ts`,
    args: args.map((a: {name: string}) => a.name),
    returnType: methodSignature.split(')').at(-1),
    isCreate: callConfig.no_op === 'CREATE',
    fullName,
  });

  writeFileSync(path.join(outDir, `${fullName}.tsx`), result);
});

console.log('Add the following imports to your app to begin using the components:\n');
imports.forEach((importName: string) => {
  console.log(`import ${importName} from '${path.join(outDir, `${importName}.tsx`)}'`);
});
