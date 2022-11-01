# Module Loading 

@franzzemen packages are deployed for use by ECMAScript, meaning they can't be synchronously imported into CommonJS 
modules (but the reverse is not true, CommonJS can be loaded synchronously in CommonJS as well as dynamically if you
really wanted to).

If you're also using ECMAScript then your package.json file contains an attribute...
    
    "type": "module"

...as opposed to containing the following or not containing this attribute at all...

    "type": "commonjs"

...or you're working from a typesript /javascript file with extension...

    .mts / .mjs

In this case, you're pretty much all set and things are simple as shown in the ECMAScript section.  

Otherwise, you'll need to use dynamic loading to load @franzzemen from a CommonJS, except for types, as shown in the 
CommonJS section.

### ECMAScript

Typical strategy, simply import and use what you need (typescript example):

    import {LogExecutionContext, LoggerAdapter, validate} from '@franzzemen/app-execution-context';
    const ec:LogExecutionContext = {};
    // The logger adapter will validate ec
    const log: LoggerAdapter = new LoggerAdapter(ec); 
    log.info(ec, `I'm alive!`);

## CommonJS

Here, we need to use dynamic imports, excpet for types.  It's recommend you use collect all your dynamic import 
results into an array, then use Promise.all, with all code processed in a file within the .then body.  You can 
synchronously import any other commonjs modules you want pretty much anywhere.

    // Importing types in typescript from CommonJS is allowed
    import type {LogExecutionContext, LoggerAdapter} from '@franzzemen/execution-context';

    const esPackagePromises = [];
    esPackagePromises.push(import('@franzzemen/logger-adapter');

    Promise.all(esPackagePromises)
        .then(esPackages => {
            const ec:AppExecutionContext = {};
            const log: LoggerAdapter = new esPackages[0].LoggerAdapter(ec);
            log.info(ec, `I'm alive!`);


            // ... other code ...
        }

Evidently, this is cumbersome, which is why you might be encouraged to take on the task to modernizing to ECMAScript 
module loading. 
