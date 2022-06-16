import { LogType, AdvanceLogger } from '../index';
import * as fs from 'fs';
let checkIfFileExist = (filepath: string, timeout: number, callback: any, time = 0) => {
  if (fs.existsSync(filepath)) {
    callback(true);
  } else {
    if (timeout > time) {
      setTimeout(() => {
        time += 500;
        checkIfFileExist(filepath, timeout, callback, time);
      }, 500);
    } else {
      callback(false);
    }
  }
};
let checkIfTextIsPresent = (filepath: string, timeout: number, callback: any, text: string, time = 0) => {
  const res = fs.readFileSync(filepath, { encoding: 'utf8', flag: 'r' });
  if (res.includes(text)) {
    callback(true);
  } else {
    if (timeout > time) {
      setTimeout(() => {
        time += 500;
        checkIfTextIsPresent(filepath, timeout, callback, text, time);
      }, 500);
    } else {
      callback(false);
    }
  }
};
test('Add Log DEBUG', (callback) => {
  AdvanceLogger.log(LogType.DEBUG, 'Test Log #0987665443');
  checkIfFileExist(AdvanceLogger.logFilePath, 10000, (result: boolean) => {
    checkIfTextIsPresent(
      AdvanceLogger.logFilePath,
      10000,
      (result2: boolean) => {
        expect(result2).toBeTruthy();
        callback();
      },
      'DEBUG Test Log #0987665443',
    );
  });
}, 10000);

test('Add Log ERROR', (callback) => {
  AdvanceLogger.log(LogType.ERROR, 'Test Log #09876654433');
  checkIfFileExist(AdvanceLogger.logFilePath, 10000, (result: boolean) => {
    checkIfTextIsPresent(
      AdvanceLogger.logFilePath,
      10000,
      (result2: boolean) => {
        expect(result2).toBeTruthy();
        callback();
      },
      'ERROR Test Log #09876654433',
    );
  });
}, 10000);

test('Add Log WARNING', (callback) => {
  AdvanceLogger.log(LogType.WARNING, 'Test Log #09876654436');
  checkIfFileExist(AdvanceLogger.logFilePath, 10000, (result: boolean) => {
    checkIfTextIsPresent(
      AdvanceLogger.logFilePath,
      10000,
      (result2: boolean) => {
        expect(result2).toBeTruthy();
        callback();
      },
      'WARNING Test Log #09876654436',
    );
  });
}, 10000);
