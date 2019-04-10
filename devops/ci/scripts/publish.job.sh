#!/usr/bin/env bash

if [[ -z "${NPM_REGISTRY}" ]] || [[ -z "${NPM_REGISTRY_TOKEN}" ]] ; then
    source ./devops/local/scripts/load-env.sh
fi

source ./devops/ci/scripts/get-latest-version.sh

docker run \
    -e PKG_NAME \
    -e NG_PKG_NAME \
    -e VERSION \
    -e NPM_REGISTRY_TOKEN \
    -e npm_config_cache=/cache/npm \
    -v npm-cache:/cache/npm \
    -v $PWD:/tmp/src \
    -v "$PKG_NAME-$CI_COMMIT_TAG":/tmp/artifacts \
    --name $CI_JOB_ID \
    node:10 /bin/bash -c \
    "
        cd /tmp/src;
        chown -R $(id -u ${USER}):$(id -g ${USER}) /tmp/artifacts;
        cp -a /tmp/artifacts/. .;

        cp ./dist/* ./;

        cp ./README.md ./dist/${PKG_NAME};
        cp ./README.md ./dist/${NG_PKG_NAME};

        cd ./dist/${PKG_NAME};
        npm version $VERSION --no-git-tag-version;
        npm config set @ciklum:registry "https://registry.npmjs.org";
        npm config set "//registry.npmjs.org/:_authToken" $NPM_REGISTRY_TOKEN;
        npm publish;

        cd ./dist/${NG_PKG_NAME};
        npm version $VERSION --no-git-tag-version;
        npm config set @ciklum:registry "https://registry.npmjs.org";
        npm config set "//registry.npmjs.org/:_authToken" $NPM_REGISTRY_TOKEN;
        npm publish;
    "
