/*
Created by Franz Zemen 10/30/2022
License Type: MIT
*/
import {
  AttributesFormatOption,
  DataFormatOption,
  LogExecutionContext,
  LoggerAdapter,
  LogLevel as AdapterLogLevel,
  LogLevelManagement,
  MessageFormatOption, validate
} from '@franzzemen/logger-adapter';
import {LoggerOptions} from 'bunyan';
import chai from 'chai';
import 'mocha';
import {BunyanLoggerAdapter} from '../publish/index.js';

let should = chai.should();
let expect = chai.expect;

const unreachableCode = false;

// Ideal bunyan options, minus overrides set by user
const idealBunyanLogEc: LogExecutionContext = {
  log: {
    options: {
      level: AdapterLogLevel.info, // Test to see native log level management work
      hidePrefix: true, // No need to hide timestamp or severity
      colorize: false,
      formatOptions: {
        message: MessageFormatOption.Augment,
        attributes: AttributesFormatOption.Augment,
        data: DataFormatOption.Default
      }
    },
    nativeLogger: {
      logLevelManagement: LogLevelManagement.Native // Severity fully managed by bunyan
    }
  }
};
if (validate(idealBunyanLogEc) !== true) {
  console.log('Unable to validate idealBunyanLogEc');
  throw new Error('Unable to validate idealBunyanLogEc');
}

describe('bunyan-logger-adapter', () => {
  describe('bunyan-logger-adapter.test.ts', () => {
    describe('general tests', () => {
      it('should test bunyan adapter', () => {
        const options: LoggerOptions = {
          name: 'bunyan'
        };
        const log = new BunyanLoggerAdapter(options);
        log.info({message: 'Hello'});
      });
      it('should test ideal options, with adapter level to info and bunyan to trace', function () {
        const bunyanLogger = new BunyanLoggerAdapter(
          {name: `bunyan`, level: 'trace'});
        const log = new LoggerAdapter(idealBunyanLogEc, 'bunyan-logger.adapter', 'bunyan-logger-adapter.test', `should test logger adapter, independent management, adapter set to debug, bunyan set to debug`,
          bunyanLogger);
        log.debug('Hello World');
        log.debug({foo: 'bar', jack: 'jill'}, 'Hello Also');
        log.trace('Goodbye');
        log.info('Farewell');
      });
    });
  });
});
