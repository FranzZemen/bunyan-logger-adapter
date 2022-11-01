# Read Me

A compact bunyan Logger implementation for @franzzemen/logger-adapter. It installs no package dependencies, but requires
bunyan to exists where it is used, as well as @franzzemen/logger-adapter.

This can be used as a reference implemenation for your own, or simply re-use it.

# Install

    npm i @franzzemen/bunyan-logger-adapter

# Usage

Per @franzzemen/logger-adapter package, there are two ways to integrate specific Logger implementations:

1. A tightly coupled method were the Logger instance is passed to the Logger Adapter
2. A very loose injection style method where it is passed via module loading options.

An example of both is provided in the github project:

    FranzZemen/examples-logger-adapter-integrations

The documentation below takes you through the steps.

## Tightly Coupled Methodology

You are using code from one or more @franzzemen/... packages, and for whatever reason you don't want to use the default
ConsoleLogger Logger implementation that the LoggerAdapter, the way @franzzemen/... packages log, creates if not
supplied with an alternative. You want to use a bunyan logger, because that's what the rest of YOUR project uses.

You decide to you want to use a tightly coupled version of the integration.

### Step 1:  Install @franzzemen/logger-adapter

But wait!  If you need this, it is likely your node-modules already has this package installed, and you want all your
@franzzemen packages to have consistent dependencies, so no reason to install the newest version of this package
separately.

If not, or just testing around, then:

    npm i @franzzemen/logger-adapater

### Step 2:  Install @franzzemen/bunyan-logger-adapter

This won't be installed by default with @franzzemen/... packages

    npm i @franzzemen/bunyan-logger-adapter

### Step 3:  Make sure you have bunyan installed

Chances are, you already have it installed, since that's what you want to use. It's almost a certainty we don't care
what version, unless it's really, really old. Also, we work in typescript and our examples reflect that...but this all
works in javascript too. Anyways...you might need the typings for bunyan.

    npm i bunyan
    npm i @types/bunyan

### Step 4:  Install other things...

You might need a copy/merge function.  We like deepmerge:

    npm i deepmerge

### Step 5:  Do the integration

Time to write some code. Noting that we recommend a LoggerAdapter be created for every method or function that needs
logging, but could be created on a source file basis, on a class basis.

But first, a segway to [module loading](./ts-src/ModuleLoading.md) in the @franzzemen universe.  Please read this if 
you're using CommonJS modules and you're not familiar with loading ES (ECMAScript) modules from CommonJS.

For this section we assume that you're using ECMAScript or you're within the promise handler section showin in the 
referenced link.

First, create your bunyan logger implementation.  In typescript this looks similar to:

    






# Usage

This package is published for an ECMAScript module loader. For CommonJS see below.

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

