#!/usr/bin/env bash
if [[ -z "${NPM_REGISTRY_TOKEN}" ]] ; then
    source ./devops/local/scripts/load-env.sh
fi

npm config set @ciklum:registry "https://registry.npmjs.org"
npm config set "//registry.npmjs.org/:_authToken" $NPM_REGISTRY_TOKEN

echo 'Installing NPM dependencies...';
npm install
