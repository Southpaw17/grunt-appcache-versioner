/*
 * grunt-appcache-versioner
 * https://github.com/Southpaw17/grunt-appcache-versioner
 *
 * Copyright (c) 2015 Bruzzese, Frank
 * Licensed under the MIT license.
 */

'use strict';

var crypto = require("crypto");

module.exports = function (grunt) {

    grunt.registerMultiTask('appcache_versioner', 'Versions your appcache manifest files with a checksum', function () {
        this.files.forEach(function (file) {
            file.src.filter(function (filepath) {
                if (grunt.file.exists(filepath)) {
                    console.log(filepath);
                    return true;
                } else {
                    grunt.log.warn(filepath + "doesn't exist");
                    return false;
                }
            }).forEach(function (filepath) {
                parseManifest(filepath, file.dest);
            });
        });
    });

    function parseManifest(filename, dest) {
        var manifestContents = grunt.file.read(filename);

        var split = manifestContents.split("CACHE:");

        var headerAndVersion, cache, network, fallback;

        split = split[1].split("NETWORK:");
        cache = split[0];
        split = split[1].split("FALLBACK:");
        network = split[0];
        fallback = split[1];

        var cacheFiles = cache.split("\n").filter(function(obj) {
            return (obj.length > 0);
        });

        var shasum = crypto.createHash('sha1');

        cacheFiles.forEach(function(filename) {
            if (grunt.file.exists(filename)) {
                shasum.update( grunt.file.read(filename) );
            } else {
                grunt.log.warn("File: " + filename + " does not exist.");
            }
        });

        var hash = shasum.digest('hex');

        headerAndVersion = "CACHE MANIFEST" + "\n" + "#" + hash + "\n\n";

        var newManifest = headerAndVersion + "CACHE:" + cache + "NETWORK:" + network + "FALLBACK:" + fallback;

        grunt.file.write(dest + "/" + filename, newManifest);

    }

};
