# Package boilerplate


## Table of contents

0. [Setup](#setup)
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API](#api)
5. [Example](#example)


### Setup
---

For starting development from Package boilerplate:

1. Create repository in https://bitbucket.org/team-metro-markets
2. Upload this structure to repository
3. Replace all matches in files `boilerplate` to `[package-name]`
4. Set version `0.0.0` in `<rootDir>/package.json`
5. Set next environment variables to repository:
    - `NPM_REGISTRY=registry.npmjs.org`
    - `NPM_REGISTRY_SPACE=@metromarkets`
    - `NPM_REGISTRY_TOKEN=[npm-registry-token]`
6. Push all changes to master branch
7. Trigger manually *Bump version* step in bitbucket pipeline (from master)
8. Check that pipeline successfully passed.
9. Install your new package to any project and check that package successfully published and works.

### Description
---

Package boilerplate - is minimalistic structure for quick start to development npm packages.
Which contains all tools for publishing and presentation of created library.

### Installation
---

### Usage

### API

### Example

In the repository placed sandbox for presentation of module.

#### Sandbox QuickStart

```sh
// for starting in production mode
$ npm run sandbox:start

// for starting in development mode
$ npm run sandbox:start:dev

// open http://localhost:8000 in the browser
```
