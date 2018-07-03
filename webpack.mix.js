let mix = require('laravel-mix');
let webpack = require('webpack')
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .js('app.js', 'server.js')
    .webpackConfig({
        resolve: {
            alias: {
                // 'styles': path.resolve(__dirname, 'resources/assets/sass'),
                // '~js': path.resolve(__dirname, 'resources/assets/js'),
            }
        },
    });
