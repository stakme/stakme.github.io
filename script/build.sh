#!/bin/sh

npx next build;
npx next export -o docs;
echo stak.me > docs/CNAME;

pegjs -o peg/parse.js peg/parse.pegjs
