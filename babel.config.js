module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: "nativewind",
        },
      ],
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@app": "./app",
            "@features": "./src/features",
            "@shared": "./src/shared",
            "@widgets": "./src/widgets",
            "@services": "./src/services",
          },
          extensions: [".ts", ".tsx", ".js", ".json"],
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
