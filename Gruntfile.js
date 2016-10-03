module.exports = function (grunt) {

    grunt.initConfig({
        
        jshint: {
            files: ['Gruntfile.js', '*.js', 'models/*.js', 'ifttt/**/*.js', 'resources/*.js', 'spec/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },

        jasmine_node: {
            options: {
                forceExit: true,
                match: '.',
                matchall: false,
                extensions: 'js',
                specNameMatcher: 'spec'
            },
            all: []
        },

        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['express:dev:stop', 'jshint', 'jasmine_node'],

//            express: {
//                files: ['*.js', '**/*.js'],
//                tasks: ['express:dev'],
//                options: {
//                    spawn: false
//                }
//            }
        },

        express: {
            options: {
                // Override defaults here
            },
            dev: {
                options: {
                    script: 'server.js'
                }
            },
            prod: {
                options: {
                    script: 'server.js',
                    node_env: 'production'
                }
            },
            test: {
                options: {
                    script: 'server.js'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-jasmine-node');

//    grunt.registerTask('default', [ 'express:dev', 'watch' ]);
    grunt.registerTask('default', [ 'jshint', 'jasmine_node', 'watch' ]);
};