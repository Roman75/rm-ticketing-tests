#!/bin/bash
rm dist/*
cp src/index.html dist/index.html
cp src/favicon.ico dist/favicon.ico
npm run dev
