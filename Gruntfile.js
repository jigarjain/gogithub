'use strict';

const cfg = require('./build-config');

console.log('Running Grunt in ' + cfg.ENV.toUpperCase() + ' mode \n');

module.exports = function (grunt) {
    grunt.initConfig({
        // Compile scss to css (Pre-process)
        sass: {
            build: {
                options: {
                    noCache: true,
                    style: 'expanded'
                },
                files: {
                    './dist/bundles/main.css': cfg.path.src + '/scss/main.scss'
                }
            }
        },


        // Build the CSS (Post-process)
        postcss: {
            options: {
                map: false, // inline sourcemaps

                processors: [
                    require('autoprefixer')({browsers: 'last 5 versions'}), // add vendor prefixes
                    require('cssnano')({
                        zindex: false
                    }) // minify the result
                ]
            },
            dist: {
                src: cfg.path.dist + '/bundles/*.css'
            }
        },

        watch: {
            scss: {
                files: cfg.path.src + '/scss/**/*.scss',
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // Loads Tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');

    const tasks = ['sass', 'postcss'];

    if (cfg.isWatchEnabled) {
        tasks.push('watch');
    }

    grunt.registerTask('default', tasks);
};
