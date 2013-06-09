# Walnut.js

Walnut is a simple script that checks npm package dependencies in package.json against npmjs.org
and gives a warning if the current version of a dependency is not consistent with the version
specified in the package.json.

## Example

var walnut = require('walnut');

walnut.check(require('./package.json'));

// knox package version is 0.8.2 latest is 0.8.3