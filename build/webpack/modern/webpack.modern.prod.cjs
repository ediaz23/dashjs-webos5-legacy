const { merge } = require('webpack-merge');
const { umdConfig, esmConfig } = require('./webpack.modern.base.cjs');
const {
    configCommonDebugProdEsm,
    configCommonMinProdEsm,
    configCommonDebugProdUmd,
    configCommonMinProdUmd
} = require('../common/webpack.common.prod.cjs');

const configModernDebugUmd = merge(umdConfig, configCommonDebugProdUmd);

const configModernMinUmd = merge(umdConfig, configCommonMinProdUmd);

const configModernDebugEsm = merge(esmConfig, configCommonDebugProdEsm);

const configModernMinEsm = merge(esmConfig, configCommonMinProdEsm);

module.exports = [configModernDebugUmd, configModernMinUmd, configModernDebugEsm, configModernMinEsm];
