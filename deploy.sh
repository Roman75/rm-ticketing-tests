#!/bin/bash

if [ ! -d "dist" ]; then
  mkdir dist
fi
rm -R dist/*
rm -R tmp/*

sh jsdoc.sh

cp -r src/libs dist/
cp src/index.html dist/index.html
cp src/favicon.ico dist/favicon.ico

sh banner.sh
npm run build
rm banner.txt

cp tmp/bundle.js dist/bundle.js
