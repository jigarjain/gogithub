'use strict';

const webpack = require('webpack');
const pkg = require('./package.json');
const cfg = require('./build-config');

/**
 * Returns the Output file config based on
 * the run-time environment
 *
 * @return {Object} Webpack's config for `output`
 */
function getOutputFilesConfig() {
    return {
        filename: '[name].js',
        path: cfg.path.dist + '/bundles',
        publicPath: '/bundles'
    };
}


/**
 * Returns the set of webpack loaders config based
 * on the run-time environment
 *
 * @return {Array} Webpack's config for `modules.loaders`
 */
function getLoaders() {
    return [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel-loader']
        }
    ];
}


/**
 * Returns the set of webpack plugins based on
 * the run-time environment
 *
 * @return {Array} Webpack's config for `plugins`
 */
function getPlugins() {
    const plugins = [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            minChunks: Infinity,
            filename: '[name].js'
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(cfg.ENV)
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        })
    ];

    if (cfg.ENV !== 'development') {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: true,
                    warnings: false
                },
                output: {
                    comments: false
                },
                sourceMap: true
            })
        );
    }

    return plugins;
}


console.log('Running Webpack in ' + cfg.ENV.toUpperCase() + ' mode \n');

module.exports = {
    devtool: 'cheap-module-source-map',

    entry: {
        app: [
            cfg.path.src + '/js/app.js'
        ],
        vendors: Object.keys(pkg.dependencies)
    },

    output: getOutputFilesConfig(),

    module: {
        loaders: getLoaders()
    },

    plugins: getPlugins(),

    watch: cfg.isWatchEnabled
};
