#!/bin/bash

if [ ! -d "tmp" ]; then
  mkdir tmp
fi
rm -R tmp/*

cp -r src/libs tmp/
cp src/index.html tmp/index.html
cp src/favicon.ico tmp/favicon.ico

source ./.locale

docker stop $repo
docker rm -f $repo
docker run --name $repo -p $port:80 \
-v $path/nginx-server.conf:/etc/nginx/conf.d/default.conf:ro \
-v $path/config.json:/usr/share/nginx/html/config.json \
-v $path/tmp:/usr/share/nginx/html \
-d nginx

npm run dev
