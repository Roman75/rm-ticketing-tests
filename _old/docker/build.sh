#!/bin/bash
cd ..
docker stop rm-ticketing-test
docker container prune --force
docker image prune --force
docker build --no-cache -t rm-ticketingg-test .
docker run --name=rm-ticketing-test -p 8085:80 -d rm-ticketingg-test
docker logs -f rm-ticketing-test
