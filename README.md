"# rm-ticketing-admin" 

basic implementation was done at https://github.com/Roman75/ticketing

here we begin to split each part into separate project to run each in separate docker container (microservice concept will be implemented) 

for dev start dev.sh

on deploy to dockerhub we now use a basic nginx container in Dockerfile

File for local development
.locale
```bash
repo=rm-ticketing-tests
port=8085
path='e:/git/rm-ticketing/rm-ticketing-tests'
```

File which must be mapped into docker container (docker-compose.yaml)
PATH/config.json:/usr/share/nginx/html/config.json
```json
{
	"wss": "http://localhost:8080"
}
```
