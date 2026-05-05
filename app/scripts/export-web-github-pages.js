const { spawnSync } = require('node:child_process');

const expoCliPath = require.resolve('expo/bin/cli');
const env = {
  ...process.env,
  EXPO_WEB_BASE_PATH: '/via-la-maschera',
};

if (process.platform === 'win32') {
  const pathKey = Object.keys(env).find((key) => key.toLowerCase() === 'path');

  for (const key of Object.keys(env)) {
    if (key.toLowerCase() === 'path' && key !== pathKey) {
      delete env[key];
    }
  }
}

const result = spawnSync(
  process.execPath,
  [expoCliPath, 'export', '--platform', 'web', '--output-dir', '.expo/web-export-github-pages'],
  {
    env,
    stdio: 'inherit',
  }
);

if (result.error) {
  console.error(result.error.message);
}

process.exit(result.status ?? 1);
