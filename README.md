# AdvanceLogger
A simple and optimized logging library for NodeJS

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install advancelogger
```
## Features

* Fast logging
* Focus on high performance
* Super-high test coverage
## Basic Usage

###TS:
```ts
// Import
import { LogType, AdvanceLogger } from 'advancelogger';

// Declaration & Initialization
const logger: AdvanceLogger = new AdvanceLogger();

// Logging
logger.log(LogType.WARNING, 'Test Log');
```
###JS:
```js
// Import
const { AdvanceLogger, LogType } = require('advancelogger');

// Declaration & Initialization
const logger = new AdvanceLogger();

// Logging
logger.log(LogType.DEBUG, 'Test Log')
```
