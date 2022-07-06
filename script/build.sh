#!/bin/sh

npm i;
npx peggy -o src/query/parse.js src/query/parse.pegjs;

npx next build;
npx next export -o docs;
echo stak.me > docs/CNAME;

