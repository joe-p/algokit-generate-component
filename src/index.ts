import nunjucks from 'nunjucks';

nunjucks.configure('templates');
const result = nunjucks.render('method.tsx.njk', {
  className: 'Dao',
  methodName: 'addProposal',
  methodSignature: 'add_proposal((string,string,string,byte[32]))void',
  clientPath: '../contracts/dao',
});

console.log(result);
