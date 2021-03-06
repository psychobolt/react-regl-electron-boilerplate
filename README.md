# React Regl Electron Boilerplate

[![Dependencies Status](https://david-dm.org/psychobolt/react-regl-electron-boilerplate.svg)](https://david-dm.org/psychobolt/react-regl-electron-boilerplate)
[![Dev Dependencies Status](https://david-dm.org/psychobolt/react-regl-electron-boilerplate/dev-status.svg)](https://david-dm.org/psychobolt/react-regl-electron-boilerplate?type=dev)
[![Peer Dependencies Status](https://david-dm.org/psychobolt/react-regl-electron-boilerplate/peer-status.svg)](https://david-dm.org/psychobolt/react-regl-electron-boilerplate?type=peer)

[![Build Status](https://travis-ci.org/psychobolt/react-regl-electron-boilerplate.svg?branch=master)](https://travis-ci.org/psychobolt/react-regl-electron-boilerplate)
[![codecov](https://codecov.io/gh/psychobolt/react-regl-electron-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/psychobolt/react-regl-electron-boilerplate)

The essential framework for Regl and React-Electron development.

## Included

- Example App based on [Whitestorm boilerplate](https://github.com/psychobolt/whitestorm-react-electron-boilerplate)
    - Redux hydration from [SQLite3](https://github.com/mapbox/node-sqlite3) to [Apollo GraphQL](https://www.apollographql.com/)
    - ORM architecture with [Sequelize](https://sequelize.org/)
- [React](https://facebook.github.io/react/) and [Redux support](https://react-redux.js.org/) libraries: 
  - [React Router Redux](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux)
  - [Electron Redux](https://github.com/hardchor/electron-redux)
  - [Redux Undo](https://github.com/omnidan/redux-undo)
  - [Redux Saga](https://redux-saga.js.org/)
  - [Reselect](https://github.com/reactjs/reselect)
- CSS-in-JS using [Styled Components](https://www.styled-components.com/)
- [Webpack](https://webpack.js.org/) + [Babel-loader](https://webpack.js.org/loaders/babel-loader/) with presets:
  - [Env](https://babeljs.io/docs/plugins/preset-env/) with [stage-0](https://github.com/babel/babel/tree/master/packages/babel-preset-stage-0) features 
  - [Flow](https://flow.org/) Type support
  - [Sass](http://sass-lang.com/) support
  - [Hot Module Reloading](httpws://webpack.js.org/guides/hot-module-replacement/) enabled with [React Refresh](https://github.com/pmmmwh/react-refresh-webpack-plugin)
- Babel plugins: 
  - [Module Resolver](https://github.com/tleunen/babel-plugin-module-resolver)
  - Regenerator Runtime support with [Tranform Runtime](https://babeljs.io/docs/plugins/transform-runtime/)
- Simple app persistence using [electron-store](https://github.com/sindresorhus/electron-store#readme)
- Logfile support using [electron-log](https://github.com/megahertz/electron-log)
- Packaging support: [electron-builder](https://github.com/electron-userland/electron-builder)
- Test runner: [Jest](https://facebook.github.io/jest)
- e2e runner: [Spectron](https://electron.atom.io/spectron/) + [EVA](https://github.com/avajs/ava)
- Mocking and testing utilities
    - [Enzyme](https://github.com/airbnb/enzyme)
    - [Redux Mock Store](https://github.com/dmitry-zaets/redux-mock-store)
    - [Redux Saga Test Plan](http://redux-saga-test-plan.jeremyfairbank.com/)
    - [Sequelize Mock](https://sequelize-mock.readthedocs.io/)
    - [Mock Apollo Client](https://github.com/Mike-Gibson/mock-apollo-client)
- Code Coverage reporter: [Codecov](https://codecov.io/)
- ES Linting: [ESLint](http://eslint.org/) using [AirBnb style guide](https://github.com/airbnb/javascript)
- Style Linting: [stylelint](https://stylelint.io)
- Install extensions using [electron-devtools-installer](https://github.com/MarshallOfSound/electron-devtools-installer), including:
  - [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
  - [Redux DevTools Extension](http://extension.remotedev.io/)

## Requirements

Follow [instructions](https://reliawire.com/brain-function-lateralisation/?fbclid=IwAR2Z9Gq2Jgf5mtkx9V1SuzZkH8smrRC8kv6uXxP97aiG-lEV8i-PXxCQVBU) to setup based on system.

> Note for Windows, you may run ```npm install --global windows-build-tools``` instead of manually installing Visual C++ Redistributable (requires 2015 or higher).

## Setup

1. Clone the repository
2. Install the latest [Node JS](https://nodejs.org/) and [Yarn](https://yarnpkg.com) and simply run ```yarn``` or ```yarn install``` command in the project directory.
3. ```git remote add base https://github.com/psychobolt/react-electron-boilerplate```

## Local development

During development, run watch task:
```sh
yarn start # compile new code changes and reloads the app
```

> Alternatively, you can launch "Debug App" in Visual Studio Code in debugger.

Testing only with production code (watch and debug unnecessary):

```sh
yarn prod
```

## Adding dependencies (libraries)

```sh
yarn add [package-name] --dev
yarn add [package-name]
```

>  For any packages you wish to include in the app build, install as a non-development dependency in ```src/package.json``` and specify it as ```externals``` in webpack config. Any native code included in ```src/package.json``` will be compiled for platform target during npm's postinstall.

## Adding DevTools

Modify the file [devtools.json](devtools.json). For example:
```json
{
    "Redux DevTools": {
        "id": "lmhkpmbekcpmknklioeibfkpmmfibljd",
        "version": "2.17.0"
    }
}
```

## Merging from base project

This project is a fork from psychobolt's [react-electron-boilerplate](https://github.com/psychobolt/react-electron-boilerplate). To fetch latest changes, ```git remote add base https://github.com/psychobolt/react-electron-boilerplate.git```. On a clean working branch, ```git pull base master```, and fix any conflicts before commit.

## Static Type Checker

```sh
yarn flow
```

> Some extensions such as in [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode) detect ```.flowconfig``` and run type checking in the editor.

## Static Types

```sh
yarn flow # performs type checking on files
```

See [official documentation](https://flow.org/) for a usage guide.

Yarn will usually run postinstall for updating flowtype definitions when new packages are added. To manually update typed definitions yourself:

```sh
yarn flow-typed-install:dev # installs development flowtypes
yarn flow-typed-install:app # installs app flowtypes
```

See additional [documentation](https://github.com/flowtype/flow-typed) for adding type definitions.

## Lint

The watch task will automatically lint on file changes. However, you can invoke the linter directly:

```sh
yarn lint # runs linter to detect any style issues (CSS & JSS)

yarn lint:css # lint only CSS
yarn lint:css --fix # tries to fix CSS lint issues

yarn lint:js # lint only JS
yarn lint:js --fix # tries to fix CSS lint issues
```

See [official documentation](https://eslint.org/) for a usage guide.

## Test

```sh
yarn test # runs functional/unit tests using Jest
yarn test --coverage # with coverage
yarn test-e2e # run end-to-end tests. (build required)
```

## Build

```sh
yarn build
```

For configuration details, see [electron-builder](https://github.com/electron-userland/electron-builder).
