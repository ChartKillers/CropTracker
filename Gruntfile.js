'use strict';

module.exports = function (grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: ['dist'],

        copy: {
            all: {
                expand: true,
                cwd: 'app/',
                src: ['*.css', '*.html', 'images/**/*', '!Gruntfile.js'],
                dest: 'dist/',
                flatten: true,
                filter: 'isFile'
            }
        },

        browserify: {
            standalone: {
                src: 'app/js/*.js',
                dest: 'dist/app.js'
            },
            test: {
                src: ['test/front-end/unit/**/*.js'],
                dest: 'test/front-end/test-suite.js',
            },
            options: {
                transform: ['debowerify', 'hbsfy'],
                debug: true
            }
        },
        simplemocha: {
            all: 'test/front-end/test-suite.js'
        },

        watch: {
            options: {
                livereload: true
            },

            html: {
                files: ['app/*.html', 'app/*.css'],
                tasks: ['copy']
            },

            js: {
                files: '<%= browserify.standalone.src %>',
                tasks: ['jshint', 'browserify:standalone',
                        'browserify:test', 'casper:acceptance']
            },

            testjs: {
                files: '<%= browserify.test.src %>',
                tasks: ['browserify:test']
            }

        },

        jshint: {
          options: {
            jshintrc: true
          },
          all: ['Gruntfile.js', 'server.js', 'app/js/*.js']
        },

        express: {
            dev: {
                options: {
                    background: true,
                    script: 'server.js'
                }
            },
        },

        casper : {
         acceptance : {
            options : {
              test : true
            },
            files : {
              'test/front-end/acceptance/casper-results.xml' :
                    ['test/front-end/acceptance/main_page_test.js']
            }
          }
        }

    });

    grunt.registerTask('server', ['jshint', 'express:dev', 'build', 'watch']);
    grunt.registerTask('serve', ['server']);
    grunt.registerTask('test', ['jshint', 'browserify:test', 'express:dev', 'casper:acceptance']);
    grunt.registerTask('build', ['clean', 'browserify:standalone', 'copy']);

};
