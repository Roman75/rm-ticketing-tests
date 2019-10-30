#!/bin/bash

if [ ! -d "dev" ]; then
  mkdir dev
fi
rm -R dev/*

cp src/libs/* dev/libs/*
cp src/index.html dev/index.html
cp src/favicon.ico dev/favicon.ico

source ./.locale

sh stop.sh

docker rm -f $repo

docker run --name $repo -p $port:80 \
-v $path/nginx-server.conf:/etc/nginx/conf.d/default.conf:ro \
-v $path/src/config.json:/usr/share/nginx/html/config.json \
-v $path/dev:/usr/share/nginx/html \
-d nginx

npm run dev
