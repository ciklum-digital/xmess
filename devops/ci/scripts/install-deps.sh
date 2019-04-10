#!/usr/bin/env bash

if [[ -z "${NPM_REGISTRY_TOKEN}" ]] ; then
    source ./devops/local/scripts/load-env.sh
fi

docker run \
    -e NPM_REGISTRY_TOKEN \
    -e npm_config_cache=/cache/npm \
    -v npm-cache:/cache/npm \
    -v $PWD:/tmp/src \
    --name $CI_PIPELINE_ID \
    node:10 /bin/bash -c \
    "mkdir /tmp/build  && cp -a /tmp/src/. /tmp/build/ && cd /tmp/build && ./devops/scripts/install.sh"

