import * as fs from 'fs';

export class AdvanceLogger {
  public logFilePath: string = './lognode.log';
  public logTimeFormat: string = 'DD/MM/YYYY - HH:mm:ss:ms';
  public logFormat: string = 'TIME LOGTYPE CALLERNAME TEXT';
  public maxLogFileSize: number = 10;
  public consoleLogsEnabled: boolean = false;

  constructor(options?: { logFilePath?: string; logTimeFormat?: string; logFormat?: string; maxLogFileSize?: number, consoleLogsEnabled?: boolean }) {
    if (options) {
      if (options.logFilePath) {
        this.logFilePath = options.logFilePath;
      }
      if (options.logTimeFormat) {
        this.logTimeFormat = options.logTimeFormat;
      }
      if (options.logFormat) {
        this.logFormat = options.logFormat;
      }
      if (options.maxLogFileSize) {
        this.maxLogFileSize = options.maxLogFileSize;
      }
      if (options.consoleLogsEnabled) {
        this.consoleLogsEnabled = options.consoleLogsEnabled;
      }
    }
  }

  log(logtype: LogType, text: string): void {
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
      let callerName = 'Anonymous';
      try {
        throw new Error();
      } catch (e: any) {
        try {
          const re: any = /(\w+)@|at (\w+) \(/g;
          let m: any;
          const st: any = e.stack;
          re.exec(st), (m = re.exec(st));
          callerName = m[1] || m[2];
        }catch (ex: any) {
          // No Caller Method Name
        }
      }
      const log =
        this.logFormat
          .replace('TIME', '' + formattedTime)
          .replace('CALLERNAME', '' + callerName)
          .replace('LOGTYPE', '' + logtype)
          .replace('TEXT', '' + text) + '\n';

      if(this.consoleLogsEnabled){
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

      fs.stat(this.logFilePath, (err, stats) => {
        if (err) {
          // Log File doesn't exist. Creating a new one.
        } else {
          const fileSizeInBytes = stats.size;
          const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
          if (fileSizeInMegabytes > this.maxLogFileSize) {
            fs.rename(this.logFilePath, this.logFilePath + '_' + Date.now(), (error) => {
              if (error) console.error('ERROR rename: ' + error);
            });
          }
        }
        fs.appendFile(this.logFilePath, log, (error) => {
          if (error) console.error('ERROR appendFile: ' + error);
        });
      });
    } catch (e) {
      console.error('ERROR: ' + e);
    }
  }
}

export enum LogType {
  DEBUG = 'DEBUG',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
}
