import nunjucks from 'nunjucks';

type GeneratedComponent = {name: string, content: string}

export default function generate(inputString: string): GeneratedComponent[] {
  nunjucks.configure('templates');
  const appSpec = JSON.parse(inputString);
  const className = appSpec.contract.name;
  const result: GeneratedComponent[] = [];

  Object.keys(appSpec.hints).forEach((methodSignature: string) => {
    const methodName = methodSignature.split('(')[0];

    const callConfig = appSpec.hints[methodSignature].call_config;
    if (!['CALL', 'CREATE'].includes(callConfig.no_op)) return;

    const { args } = appSpec.contract.methods.find((m: {name: string}) => m.name === methodName);

    const capitalizedMethodName = methodName.charAt(0).toUpperCase() + methodName.slice(1);
    const fullName = `${className}${capitalizedMethodName}`;

    const content = nunjucks.render('method.tsx.njk', {
      className,
      methodName,
      methodSignature,
      args: args.map((a: {name: string}) => a.name),
      returnType: methodSignature.split(')').at(-1),
      isCreate: callConfig.no_op === 'CREATE',
      fullName,
    });

    result.push({ name: fullName, content });
  });

  return result;
}
