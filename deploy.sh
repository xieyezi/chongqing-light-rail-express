#!/bin/bash

docker stop chongqing-light-rail-express-container
docker rm chongqing-light-rail-express-container
docker rmi chongqing-light-rail-express-image

docker build -t chongqing-light-rail-express-image .
docker run -p 9001:80 -d --name chongqing-light-rail-express-container chongqing-light-rail-express-image