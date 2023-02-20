/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
const pak = require('./package.json');

const modules = Object.keys({
  ...pak.peerDependencies,
});
module.exports = {
  resolver: {
    extraNodeModules: modules.reduce(
      (acc, name) => {
        acc[name] = path.join(__dirname, 'node_modules', name);
        return acc;
      },
      {
        ...require('node-libs-react-native'),
      },
    ),
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName.startsWith('@ethersproject/pbkdf2')) {
        return {
          filePath: require.resolve('./pdkdf2.js'),
          type: 'sourceFile',
        };
      }
      // Optionally, chain to the standard Metro resolver.
      return context.resolveRequest(context, moduleName, platform);
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
