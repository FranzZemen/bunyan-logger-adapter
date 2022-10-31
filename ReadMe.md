# Read Me
A compact bunyan Logger implementation for @franzzemen/logger-adapter.  It installs no package dependencies, but 
requires bunyan to exists where it is used.  It should work with all recent/near future versions of bunyan.

# Install

    npm i @franzzemen/bunyan-logger-adapter

# Usage

This package is published for an ECMAScript module loader.  For CommonJS see below.

### ECMAScript

Create an Logger Adapter with defaults (including Native console logger).

    import {LogExecutionContext, LoggerAdapter, validate} from '@franzzemen/app-execution-context';
    const ec:LogExecutionContext = {};
    // The logger adapter will validate ec
    const log: LoggerAdapter = new LoggerAdapter(ec); 
    log.info(ec, `I'm alive!`);

## CommonJS

    // Importing types in typescript from CommonJS is allowed
    import {LogExecutionContext, LoggerAdapter} from '@franzzemen/execution-context';

    import('@franzzemen/logger-adapter')
        .then(package => {
            const ec:AppExecutionContext = {};
            const log: LoggerAdapter = new package.LoggerAdapter(ec);
            log.info(ec, `I'm alive!`);            
        }

