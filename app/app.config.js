const appJson = require('./app.json');

module.exports = () => {
  const baseUrl = process.env.EXPO_WEB_BASE_PATH;

  return {
    expo: {
      ...appJson.expo,
      experiments: {
        ...appJson.expo.experiments,
        ...(baseUrl ? { baseUrl } : {}),
      },
    },
  };
};
