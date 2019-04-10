#!/usr/bin/env bash

if [[ -z "${NPM_REGISTRY_TOKEN}" ]] ; then
    source ./devops/local/scripts/load-env.sh
fi


docker run \
    -e NPM_REGISTRY_TOKEN \
    -e npm_config_cache=/cache/npm \
    -v npm-cache:/cache/npm \
    -v $PWD:/tmp/src \
    --name $CI_JOB_ID \
    node:10 /bin/bash -c \
   "
        mkdir /tmp/build;
        echo 'copy sources to docker';
        cp -a /tmp/src/. /tmp/build/;
        echo 'go to copy path';
        cd /tmp/build;
        echo 'installing...';
        ./devops/scripts/install.sh;
        echo 'installing completed';
        npm run build;
        echo 'build';
        chown -R $(id -u ${USER}):$(id -g ${USER}) ./dist
        cp -a ./dist /tmp/src
   "
