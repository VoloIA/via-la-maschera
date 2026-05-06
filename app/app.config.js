module.exports = ({ config }) => {
  const baseUrl = process.env.EXPO_WEB_BASE_PATH;

  return {
    ...config,
    experiments: {
      ...config.experiments,
      ...(baseUrl ? { baseUrl } : {}),
    },
  };
};
