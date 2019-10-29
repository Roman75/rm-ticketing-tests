#!/bin/bash

mkdir build
rm -R build/*
cp src/index.html build/index.html
cp src/favicon.ico build/favicon.ico

npm run build
