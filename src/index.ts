import * as fs from 'fs';
import {dirname} from 'path';

export class AdvanceLogger {
  public static logFilePath: string = './lognode.log';
  public static logTimeFormat: string = 'DD/MM/YYYY - HH:mm:ss:ms';
  public static logFormat: string = 'TIME LOGTYPE TEXT';
  public static maxLogFileSize: number = 10;
  public static consoleLogsEnabled: boolean = false;

  static Init(options?: { logFilePath?: string; logTimeFormat?: string; logFormat?: string; maxLogFileSize?: number, consoleLogsEnabled?: boolean }) {
    if (options) {
      if (options.logFilePath) {
        AdvanceLogger.logFilePath = options.logFilePath;
      }
      if (options.logTimeFormat) {
        AdvanceLogger.logTimeFormat = options.logTimeFormat;
      }
      if (options.logFormat) {
        AdvanceLogger.logFormat = options.logFormat;
      }
      if (options.maxLogFileSize) {
        AdvanceLogger.maxLogFileSize = options.maxLogFileSize;
      }
      if (options.consoleLogsEnabled) {
        AdvanceLogger.consoleLogsEnabled = options.consoleLogsEnabled;
      }
    }
    if (!fs.existsSync(dirname(this.logFilePath))){
      fs.mkdirSync(dirname(this.logFilePath), { recursive: true });
    }
  }

  static log(logtype: LogType, text: string): void {
    try {
      const date = new Date();
      const hours = date.getHours();
      const minutes = '0' + date.getMinutes();
      const seconds = '0' + date.getSeconds();
      const milliseconds = '0' + date.getMilliseconds();
      const day = date.getUTCDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const formattedTime = this.logTimeFormat
        .replace('DD', '' + day)
        .replace('MM', '' + month)
        .replace('YYYY', '' + year)
        .replace('HH', '' + hours)
        .replace('mm', '' + minutes.substr(-2))
        .replace('ss', '' + seconds.substr(-2))
        .replace('ms', '' + milliseconds.substr(-3));
      const log =
        AdvanceLogger.logFormat
          .replace('TIME', '' + formattedTime)
          .replace('LOGTYPE', '' + logtype)
          .replace('TEXT', '' + text) + '\n';

      if(AdvanceLogger.consoleLogsEnabled){
        switch (logtype){
          case LogType.DEBUG:
          {
            console.log(log);
          }
            break;
          case LogType.ERROR:
          {
            console.error(log);
          }
            break;
          case LogType.WARNING:
          {
            console.warn(log);
          }
            break;
        }
      }

      fs.stat(AdvanceLogger.logFilePath, (err, stats) => {
        if (err) {
          // Log File doesn't exist. Creating a new one.
        } else {
          const fileSizeInBytes = stats.size;
          const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
          if (fileSizeInMegabytes > AdvanceLogger.maxLogFileSize) {
            fs.rename(AdvanceLogger.logFilePath, AdvanceLogger.logFilePath + '_' + Date.now(), (error) => {
              if (error) console.error('ERROR rename: ' + error);
            });
          }
        }
        fs.appendFile(AdvanceLogger.logFilePath, log, (error) => {
          if (error) console.error('ERROR appendFile: ' + error);
        });
      });
    } catch (e) {
      console.error('ERROR: ' + e);
    }
  }
}

export enum  LogType {
  DEBUG = 'DEBUG',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
}