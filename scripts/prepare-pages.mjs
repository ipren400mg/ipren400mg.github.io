import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const distDir = resolve('dist');
const indexHtml = resolve(distDir, 'index.html');
const notFoundHtml = resolve(distDir, '404.html');
const redirectScript = `    <script>
      if (window.location.pathname !== '/') {
        const redirectTarget =
          window.location.origin +
          '/#' +
          window.location.pathname +
          window.location.search +
          window.location.hash;

        window.location.replace(redirectTarget);
      }
    </script>`;

copyFileSync(indexHtml, notFoundHtml);
writeFileSync(
  notFoundHtml,
  readFileSync(notFoundHtml, 'utf8').replace('</head>', `${redirectScript}\n  </head>`),
);
writeFileSync(resolve(distDir, '.nojekyll'), '');
