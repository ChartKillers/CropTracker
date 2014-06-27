'use strict';

module.exports = function (grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                files: {
                    'dist/style.css': 'app/sass/application.scss'
                },
                options: {
                  includePaths: [
                    require('node-bourbon').includePaths,
                    'app/bower_components/color-scale',
                    'app/bower_components/font-awesome/scss'
                  ]
                }
            }
        },
        clean: ['dist'],

        copy: {
            main:{
                files:[
                {
                expand:true,
                src:['app/bower_components/font-awesome/fonts/*'],
                dest: 'dist/fonts/',
                filter: 'isFile',
                flatten: true
                },
                {
                expand: true,
                flatten: true,
                cwd:'app/',
                src:['views/*'],
                dest:'dist/views'
                },
                {
                expand:true,
                src:['vendors/*'],
                dest: 'dist/',
                filter: 'isFile'
                }]
            }
        },

        browserify: {
            standalone: {
                src: 'app/js/**/*.js',
                dest: 'dist/client.js'
            },
            test: {
                src: ['test/front-end/unit/**/*.js'],
                dest: 'test/front-end/test-suite.js',
            },
            options: {
                transform: [ 'debowerify', 'hbsfy'],
                debug: true
            }
        },
        // simplemocha: {
        //     all: 'test/front-end/test-suite.js'
        // },

        simplemocha: {
          options: {
            ui: 'bdd'
          },
          all: { src: ['test/api/**/*.js'] }
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
                tasks: ['browserify:standalone']
            },

            testjs: {
                files: '<%= browserify.test.src %>',
                tasks: ['browserify:test']
            },
            express: {
                files: ['server.js', 'serverRailsTemp.js', 'api/**/*.js'],
                tasks: ['express:tempService', 'express:dev'],
                options: {
                    spawn: false
                }
            },
            jade: {
                files: ['app/views/*'],
                tasks: ['copy']
            },
            sass: {
                files:['app/sass/**/*'],
                tasks:['sass']
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
            }
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

    grunt.registerTask('server', ['express:dev', 'build', 'watch']);
    grunt.registerTask('serve', ['server']);
    grunt.registerTask('test', ['jshint', 'browserify:test', 'express:dev', 'casper:acceptance']);
    grunt.registerTask('build', ['clean', 'browserify:standalone', 'sass', 'copy']);
    grunt.registerTask('test:api', ['simplemocha']);
};
