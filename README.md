"# rm-ticketing-admin" 

basic implementation was done at https://github.com/Roman75/ticketing

here we begin to split each part into separate project to run each in separate docker container (microservice concept will be implemented) 

# create files
create file: **.locale**
```bash
project_path="e:/git/rm-ticketing"
repo=rm-ticketing-tests
port=8085
path="${project_path}/${repo}"
```

create file: **config.json**
```json
{
	"wss": "http://localhost:8080"
}
```

# how to run

## develop
development is only possible in chrome browser (because of usage of javascript ES6)
#### run sh dev.sh

## build
to test full bundle (transpiled version to support older browser like IE11) create a build and run the docker container locally
#### run sh build.sh
now you can run the local build docker container
replace $REPO with the value of variable you defined in (.locale => $repo)
#### docker start $REPO

## deploy
File which must be mapped into docker container (docker-compose.yaml)
PATH/config.json:/usr/share/nginx/html/config.json
```json
{
	"wss": "http://DOMAIN.TLD"
}
```


#### run sh deploy.sh
