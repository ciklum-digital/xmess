#!/usr/bin/env bash

if [[ -z "${NPM_REGISTRY_TOKEN}" ]] ; then
    source ./devops/local/scripts/load-env.sh
fi

CI_COMMIT_MESSAGE=$(git log -1 --pretty=%B)
echo "CI_COMMIT_MESSAGE = $CI_COMMIT_MESSAGE"

bumpAction=patch
desc=$(echo "$CI_COMMIT_MESSAGE" | sed -r '/^\s*$/d' | awk '{print tolower($0)}')

if [[ $desc =~ ^minor.* ]] ; then
    bumpAction=minor
fi
if [[ $desc =~ ^major.* ]] ; then
    bumpAction=major
fi

./devops/ci/scripts/login-to-git.sh
./devops/ci/scripts/bump-version.sh $bumpAction
