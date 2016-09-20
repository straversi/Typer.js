'use strict';

/**!
 *
 * typer.js
 * gruntfile.js
 *
 */


// -----------------------------------------------------------------------------
//
// Methods
//
// -----------------------------------------------------------------------------
function getUserDir() {
    var dirpath = path.join.apply(path, arguments);
    var homepath = process.env[process.platform === 'win32'
        ? 'USERPROFILE'
        : 'HOME'];
    dirpath = path.resolve(homepath, dirpath);
    return dirpath;
}


module.exports = function(grunt) {
    // load the NPM modules
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-closure-compiler');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-jsdoc-ng');
    grunt.loadNpmTasks('grunt-jsbeautifier');



    // -----------------------------------------------------------------------------
    //
    // Properties
    //
    // -----------------------------------------------------------------------------
    var path = require('path');
    var pkg = grunt.file.readJSON('package.json');
    var name = '<%= pkg.filename %>';
    var author = '<%= pkg.author %>';
    var config = {
        src  : 'src',
        dist : 'distribution'
    };



    // -----------------------------------------------------------------------------
    //
    // Configure tasks
    //
    // -----------------------------------------------------------------------------
    grunt.initConfig({
        // Metadata
        pkg    : grunt.file.readJSON('package.json'),
        config : config,
        banner : grunt.file.read('./src/license-info.txt')
            .replace(/@VERSION/, pkg.version)
            .replace(/@DATE/,    grunt.template.today('dd. mmmm yyyy')),

        clean: ['documentation'],



        //
        // JavaScript
        //
        'closure-compiler': {
            frontend: {
                options : {
                    compilation_level : 'ADVANCED_OPTIMIZATIONS',
                    language_in       : 'ECMASCRIPT6_STRICT',
                },
                js           : '<%= config.dist %>/typer.js',
                jsOutputFile : '<%= config.dist %>/typer.min.js',
                maxBuffer    : 500,
                noreport     : true
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            target: {
                // src: ['<%= config.src %>/**/*.js']
                src: ['<%= config.dist %>/typer.js']
            }
        },

        concat: {
            temp: {
                dest: '<%= config.dist %>/.temp.js',
                src: [
                    '<%= config.src %>/*.js',
                    '!<%= config.src %>/typer.js'
                ]
            },
            js: {
                options: {
                    banner: '<%= banner %>',
                    process: function(content, srcpath) {
                        var temp = grunt.file.read('distribution/.temp.js');
                        grunt.file.delete('distribution/.temp.js');
                        return grunt.template.process(content.replace(/@INCLUDES/, temp));
                    }
                },
                dest: '<%= config.dist %>/' + name + '.js',
                src: [
                    '<%= config.src %>/typer.js'
                ]
            }
        },

        uglify: {
            options: {
                report: 'min',
                preserveComments: false,
                mangle: {
                    except: ['js']
                }
            },
            js: {
                src: '<%= concat.js.dest %>',
                dest: '<%= config.dist %>/' + name + '.min.js'
            }
        },

        jsbeautifier: {
            src : [
                '<%= config.dist %>/**/*'
            ],
            options:{
                js: {
                    indentSize: 2
                }
            }
        },


        //
        // Watch
        //
        watch: {
            files: [
                '<%= config.src %>/**/*'
            ],
            tasks: ['default']
        },


        //
        // Documentation
        //
        // 'jsdoc-ng': {
        //     dist: {
        //         src: [
        //             'README.md',
        //             '<%= config.src %>/*.js',
        //             '!<%= config.src %>/typer.js'
        //         ],
        //         dest: 'documentation/classes/',
        //         options: {
        //         }
        //     }
        // },

    });



    // -----------------------------------------------------------------------------
    //
    // Register tasks
    //
    // -----------------------------------------------------------------------------
    grunt.registerTask('default', [
        'clean',
        'js'
        // 'jsdoc-ng'
    ]);

    grunt.registerTask('js', [
        'concat',
        'uglify',
        'jshint',
        'closure-compiler',
        'jsbeautifier'
    ]);

    // grunt.registerTask('doc', [
    //     'clean',
    //     'jsdoc-ng'
    // ]);
};
