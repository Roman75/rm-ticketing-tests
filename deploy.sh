#!/bin/bash

if [ ! -d "tmp" ]; then
  mkdir tmp
fi
rm -R tmp/*

cp src/libs/* tmp/libs/*
cp src/index.html tmp/index.html
cp src/favicon.ico tmp/favicon.ico

sh banner.sh
npm run build
rm banner.txt
