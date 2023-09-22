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

  if (appSpec.hints[methodSignature].call_config.no_op !== 'CALL') return;

  const result = nunjucks.render('method.tsx.njk', {
    className,
    methodName,
    methodSignature,
    clientPath: `./${className}Client.ts`,
  });

  const capitalizedMethodName = methodName.charAt(0).toUpperCase() + methodName.slice(1);

  imports.push(`${className}${capitalizedMethodName}`);

  writeFileSync(path.join(outDir, `${className}${capitalizedMethodName}.tsx`), result);
});

console.log('Add the following imports to your app to begin using the components:\n');
imports.forEach((importName: string) => {
  console.log(`import ${importName} from '${path.join(outDir, `${importName}.tsx`)}'`);
});
