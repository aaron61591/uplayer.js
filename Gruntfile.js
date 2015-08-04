module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            all: [
                'src/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        uglify: {
            js: {
                files: {
                    'dist/uplayer.js': [
                        'src/player.js',
                        'src/context.js',
                        'src/draw-image.js',
                        'src/image.js',
                        'src/debug.js',
                        'src/uplayer.js'
                    ]
                }
            }
        },
        express: {
            options: {
                port: 4000
            },
            dev: {
                options: {
                    script: 'dev/server.js'
                }
            }
        },
        watch: {
            express: {
                files: [
                    'dev/server.js'
                ],
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            },
            example: {
                files: [
                    'dev/index.html',
                    'dev/index.css',
                    'dev/example/*',
                ],
                options: {
                    livereload: true
                }
            },
            uplayer: {
                files: [
                    'src/**/*'
                ],
                tasks: ['uglify'],
                options: {
                    livereload: true
                }
            }
        },
        copy: {
            release: {
                src: 'dist/uplayer.js',
                dest: 'release/uplayer-' + grunt.file.readJSON('package.json').version + '.js'
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify', 'express:dev', 'watch']);
    grunt.registerTask('release', ['jshint', 'uglify', 'copy']);
};