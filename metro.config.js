const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Add alias configuration
// config.resolver = {
//   ...config.resolver,
//   alias: {
//     "@": "./app", // Alias "@" to the "src" directory
//   },
// };
module.exports = withNativeWind(config, { input: "./app/global.css" });
