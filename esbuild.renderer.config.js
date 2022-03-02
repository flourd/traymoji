import { resolve } from 'path';

/**
 * @var {Partial<import('esbuild').BuildOptions>}
 */
export default {
  platform: 'browser',
  entryPoints: [resolve('src/renderer/index.tsx')],
  bundle: true,
  target: 'chrome98', // electron version target
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.css': 'css',
  },
}
