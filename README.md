# typescript-lib-starter

[![npm](https://img.shields.io/npm/v/@bndynet/typescript-lib-starter.svg)](https://www.npmjs.com/package/@bndynet/typescript-lib-starter)
[![Build Status](https://travis-ci.com/bndynet/typescript-lib-starter.svg?branch=master)](https://travis-ci.com/bndynet/typescript-lib-starter)
[![Coverage Status](https://coveralls.io/repos/github/bndynet/typescript-lib-starter/badge.svg?branch=master)](https://coveralls.io/github/bndynet/typescript-lib-starter?branch=master)
[![Code Styles](https://img.shields.io/badge/Code_Style-Prettier-ff69b4.svg)](https://github.com/prettier/prettier)

This starter project implements following features:

- :school_satchel: Include all packages for coding, linting, testing and building
- :art: Compile sass to css using node-sass, autoprefixer and postcss
- :package: Release to NPM automatically
- :inbox_tray: Build library to UMD and CommonJS modules
- :blue_book: Generate documentation of your TypeScript files automatically
- :running: Script for publishing documentation to your gh-pages branch
- :heavy_check_mark: Check your commit message when `git commit ...`
- :book: Publish your unit tests report to [coveralls.io](https://coveralls.io/) by CI
- :cl: Default CI scripts for [Travis CI](https://travis-ci.com/) includes release and publish automatically

## Start your library

1. Clone this repo:

    `git clone https://github.com/bndynet/typescript-lib-starter.git <your-location>`

1. Initialize your library:

    `npm i && npm run init` and type your package informations

1. Now, you can code your library and bellow commands to start your work:

    ```bash
    npm start
    npm run lint
    npm run build
    npm run docs
    npm run test
    npm run test:watch
    npm run precommit
    ```

NOTE: The below steps will guide you to use Travis CI to document, release and report automatically.

1. Use GitHub account to log in [Travis CI](https://travis-ci.com/), sync repos and enable your repo
1. Set tokens(**GH_TOKEN** and **NPM_TOKEN** that can be generated at [GitHub](https://github.com/settings/tokens) and [npmjs.com](https://www.npmjs.com/settings/bndy/tokens)) in Travis CI repo to allow to release to NPM and generate gh-pages
1. Use GitHub account to log in [coveralls.io](https://coveralls.io/), sync repos and enable your repo to allow to report testing
