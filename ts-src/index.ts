/*
Created by Franz Zemen 10/30/2022
License Type: MIT
*/

import {Logger as LoggerI, LogLevel} from '@franzzemen/logger-adapter';
import Logger, {LogLevelString} from 'bunyan';

export class BunyanLoggerAdapter implements LoggerI {
  logger: Logger;

  constructor(options: Logger.LoggerOptions) {
    this.logger = new Logger(options);
  }

  debug(): boolean;
  debug(data, message?: string, ...params);
  debug(data?, message?: string, ...params): boolean | void {
    if(data || message) {
      if (message) {
        if (!params) {
          params = [message];
        }
      }
      this.logger.debug(data, ...params);
    } else {
      return this.logger.debug();
    }
  }

  error(): boolean;
  error(err, ...params);
  error(err?, ...params): boolean | void {
    if(err) {
      this.logger.error(err, ...params);
    } else {
      return this.logger.error();
    }
  }

  info(): boolean;
  info(data, message?: string, ...params);
  info(data?, message?: string, ...params): boolean | void {
    if(data || message) {
      if (message) {
        if (!params) {
          params = [message];
        }
      }
      this.logger.info(data, ...params);
    } else {
      return this.logger.info();
    }
  }

  trace(): boolean;
  trace(data, message?: string, ...params);
  trace(data?, message?: string, ...params): boolean | void {
    if (data || message) {
      if (message) {
        if (!params) {
          params = [message];
        }
      }
      this.logger.trace(data, ...params);
    } else {
      return this.logger.trace();
    }
  }

  warn(): boolean;
  warn(data, message?: string, ...params);
  warn(data?, message?: string, ...params): boolean | void {
    if (data || message) {
      if (message) {
        if (!params) {
          params = [message];
        }
      }
      this.logger.warn(data, ...params);
    } else {
      return this.logger.warn();
    }
  }

  setLevel(level: LogLevel | string) {
    this.logger.level(level as LogLevelString);
  }
}
