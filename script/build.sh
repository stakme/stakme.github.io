#!/bin/sh

npx next build;
npx next export -o docs;
echo stak.me > docs/CNAME;

npx peggy -o peg/parse.js peg/parse.pegjs
