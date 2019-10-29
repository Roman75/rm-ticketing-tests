#!/bin/bash

mkdir dev
rm -R dev/*
cp src/index.html dev/index.html
cp src/favicon.ico dev/favicon.ico

source ./.env

sh stop.sh

docker rm -f rm-ticketing-$repo

docker run --name rm-ticketing-$repo -p $port:80 \
-v $path/nginx-server.conf:/etc/nginx/conf.d/default.conf:ro \
-v $path/config.json:/usr/share/nginx/html/config.json \
-v $path/dev:/usr/share/nginx/html \
-d nginx

npm run dev
