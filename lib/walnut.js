// Check version information of packages

var _ = require('underscore'),
    request = require('request'),
    async = require('async');

/*
    Log discrepencies between the package of a project and the current npmjs version

    walnut.check(require('./package.json))
*/
exports.check = function(projectPackage) {
    if (!projectPackage) return console.log('WARN', 'No package detected for this project');

    var latestVersion = {};

    async.each(_.keys(projectPackage.dependencies), function(project, checked) {
        var currentVersion = projectPackage.dependencies[project];

        request.get({
            url: 'http://registry.npmjs.org/' + project + '/latest',
            json: true,
        },
        function(err, r, info) {
            if (err || !r) return checked([500, 'Could not pull version info from npmjs']);

            if (r.statusCode !== 200) return checked([r.statusCode, info]);

            checked(null, latestVersion[project] = info.version);
        });
    },
    function(err) {
        if (err && err[0] === 408) return;

        if (err) return console.log(err);

        _.keys(projectPackage.dependencies).forEach(function(project) {
            var existing = projectPackage.dependencies[project],
                latest = latestVersion[project];

            if (existing !== latest)
                console.log(project, 'package version is', existing, 'latest is', latest);
        });
    });
};

