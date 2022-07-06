#!/bin/sh

npm i;
npx next build;
npx next export -o docs;
echo stak.me > docs/CNAME;

npx peggy -o src/query/parse.js src/query/parse.pegjs
