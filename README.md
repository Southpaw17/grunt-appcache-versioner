# grunt-appcache-versioner

> Versions your appcache manifest files with a checksum

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-appcache-versioner --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-appcache-versioner');
```

## The "appcache_versioner" task

### Overview
In your project's Gruntfile, add a section named `appcache_versioner` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  appcache_versioner: {
    manifests: {
      src: ["**/*.manifest", "**/*.appcache"],
      dest: "."
    },
  },
});
```

### Usage Examples

#### Normal Use Case
This describes a common use case: simply adding a version to your currently existing manifest files.  

```js
grunt.initConfig({
  appcache_versioner: {
    manifests: {
      src: ["**/*.manifest", "**/*.appcache"],
      dest: "."
    },
  },
});
```

Let's say you have the following cache manifest file in the root directory of your project:
###### example.manifest
```CACHE MANIFEST
#Version 1.0.0

CACHE:
some/file.html
some/other/script.js

NETWORK:
*

FALLBACK:
#No fallbacks
```

Running the above configuration will overwrite this file with the following:
###### example.manifest
```CACHE MANIFEST
#ea91533aa7cebc582decb5c7c7ba573b3d7ebc2e

CACHE:
some/file.html
some/other/script.js

NETWORK:
*

FALLBACK:
#No fallbacks
```

Note by changing the dest property of your target the file will be written to the dest directory.  For example, with `dest: "build"` your versioned manifest file will end up in `build/example.manifest`, leaving the original intact.  The file structure is preserved, so if you had `some/dir/example.manifest` it would appear as `build/some/dir/example.manifest`

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
