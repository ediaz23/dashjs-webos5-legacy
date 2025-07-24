const path = require('path');
const { merge } = require('webpack-merge');
const { commonBaseConfig } = require('../common/webpack.common.base.cjs');

const legacyConfig = merge(commonBaseConfig, {
    target: ['web', 'es5'],
    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: [/core-js/],
            loader: 'babel-loader',
            options: {
                sourceType: 'unambiguous',
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            useBuiltIns: 'usage',
                            targets: {
                                chrome: '38'
                            },
                            corejs: '3.39.0',
                        }
                    ],
                ],
                plugins: [
                    '@babel/plugin-transform-runtime',
                    '@babel/plugin-transform-parameters',
                ],
            },
        }]
    }
});

const umdConfig = merge(legacyConfig, {
    output: {
        path: path.resolve(__dirname, '../../../dist/legacy/umd'),
        publicPath: '/dist/legacy/umd/',
        library: 'dashjs',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
});

module.exports = { umdConfig };
