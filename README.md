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

### TS:
```ts
// Import
import { LogType, AdvanceLogger } from 'advancelogger';

// Declaration & Initialization
const logger: AdvanceLogger = new AdvanceLogger();

// Logging
logger.log(LogType.WARNING, 'Test Log');
```
### JS:
```js
// Import
const { AdvanceLogger, LogType } = require('advancelogger');

// Declaration & Initialization
const logger = new AdvanceLogger();

// Logging
logger.log(LogType.DEBUG, 'Test Log')
```

## Advance Usage

### TS:
```ts
// Import
import { LogType, AdvanceLogger } from 'advancelogger';

// Declaration & Initialization
const options = {
  logFilePath: './lognode.log',
  logTimeFormat: 'DD/MM/YYYY - HH:mm:ss:ms',
  logFormat: 'TIME LOGTYPE CALLERNAME TEXT',
  maxLogFileSize: 10,
  consoleLogsEnabled: false
};
const logger: AdvanceLogger = new AdvanceLogger(options);

// Logging
logger.log(LogType.WARNING, 'Test Log');
```

### JS:
```js
// Import
import { LogType, AdvanceLogger } from 'advancelogger';

// Declaration & Initialization
const options = {
  logFilePath: './lognode.log',
  logTimeFormat: 'DD/MM/YYYY - HH:mm:ss:ms',
  logFormat: 'TIME LOGTYPE CALLERNAME TEXT',
  maxLogFileSize: 10,
  consoleLogsEnabled: false
};
const logger: AdvanceLogger = new AdvanceLogger(options);

// Logging
logger.log(LogType.WARNING, 'Test Log');
```

### Options:
| Attribute | Description | Type | Default Value
| --- | --- | --- | --- |
| `logFilePath` | The LogFile Path | `string` | `./lognode.log` |
| `logTimeFormat` | The time format of the log | `string` | `DD/MM/YYYY - HH:mm:ss:ms` |
| `logFormat` | The log format | `string` | `TIME LOGTYPE CALLERNAME TEXT` |
| `maxLogFileSize` |  The max size of each log file expressed in MB  | `number` | `10` |
| `consoleLogsEnabled` | This will print the logs also in console.log | `boolean` | `false` |
