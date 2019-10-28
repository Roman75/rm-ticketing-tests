#!/bin/bash
docker stop rm-ticketin-test
docker container prune --force
docker image prune --force
docker build --no-cache -t rm-ticketing-test .
docker run --name=rm-ticketin-test -p 8085:80 -d rm-ticketing-test
docker logs -f rm-ticketin-test