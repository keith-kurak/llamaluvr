const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
const { withMdx } = require("@bacons/mdx/metro");

const config = getDefaultConfig(__dirname)

module.exports = withMdx(withNativeWind(config, { input: './global.css' }))