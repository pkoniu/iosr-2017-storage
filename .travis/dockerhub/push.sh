#!/bin/sh
set -e

docker login -u "$DOCKER_USER" -p "$DOCKER_PASS"
docker push $DOCKER_USER/$DOCKER_REPO
