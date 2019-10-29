#!/bin/bash
sh stop.sh

mkdir dev
rm -R dev/*
cp src/index.html dev/index.html
cp src/favicon.ico dev/favicon.ico

source ./.env

pathDist=$path/dev
pathDefaultConf=$path/default.conf

docker run --name rm-ticketing-$repo -p $port:80 -v $pathDist:/usr/share/nginx/html:ro -v $pathDefaultConf:/etc/nginx/conf.d/default.conf:ro -d nginx
docker logs -f
npm run dev
