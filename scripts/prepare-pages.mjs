import { copyFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const distDir = resolve('dist');
const indexHtml = resolve(distDir, 'index.html');

copyFileSync(indexHtml, resolve(distDir, '404.html'));
writeFileSync(resolve(distDir, '.nojekyll'), '');
