/* eslint-disable no-console */
import path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import generate from '../src';

const outDir = path.join('test', 'components');
const inputString = readFileSync('./test/Dao.json', 'utf8');

const result = generate(inputString);

result.forEach((r) => writeFileSync(path.join(outDir, `${r.name}.tsx`), r.content));

console.log('If you are using the Algokit react template add these imports to your App.tsx to use the components:\n');
result.forEach((r) => {
  console.log(`import ${r.name} from '${path.join(outDir, `${r.name}.tsx`)}'`);
});
