const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const TerserPlugin = require("terser-webpack-plugin");


// uyarı veren paketlerden hangisine bağımlı olduğunu gösterir
// npm ls inflight rimraf glob


module.exports = (env, argv) => {
   
    console.log(`Webpack 'mode': ${argv.mode != 'production' ? 'development' : 'production'}`);
    return {
        mode: argv.mode != 'production' ? 'development' : 'production',
        entry: {
            "tablix": ['./src/tablix-initJS.js'],
            "default-theme": ['./src/themes/themes.scss']
        },
        output: {
            path: path.resolve(__dirname, 'output'),
            filename: '[name].min.js',
            clean: true
        },
        // devtool: 'source-map',
        optimization: {
            removeEmptyChunks: true,
            minimize: true,
            removeAvailableModules: true,
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    minify: TerserPlugin.uglifyJsMinify,
                    terserOptions: {
                        compress: {
                            // drop_console: true
                        },
                    },
                    extractComments: {
                        banner: (licenseFile) => {
                            return `DEV: Arda Yaldiz`;
                        },
                    },
                })
            ]
        },
        performance: {
            hints: false,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-transform-class-properties']
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                },
            ],
        },
        plugins: [
            new RemoveEmptyScriptsPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].min.css',
            })
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, '')
            },
            devMiddleware: {
                publicPath: '/output/'
            },
            compress: true,
            port: 9000,
            hot: true,
            liveReload: true,
            open: true
        },
        resolve: {
            alias: {
                theme1comp: path.resolve(__dirname, './src/sass/components/theme1')
            },
        },
    }
};