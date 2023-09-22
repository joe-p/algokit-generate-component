import nunjucks from 'nunjucks';
import { readFileSync, writeFileSync } from 'fs';

nunjucks.configure('templates');

const appSpec = JSON.parse(readFileSync('./test/Dao.json', 'utf8'));

const className = appSpec.contract.name;

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

  writeFileSync(`./test/components/${className}${capitalizedMethodName}.tsx`, result);
});
