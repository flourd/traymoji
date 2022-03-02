import { resolve } from 'path';

/**
 * @var {Partial<import('esbuild').BuildOptions>}
 */
export default {
  platform: 'node',
  entryPoints: [resolve('src/main/main.ts')],
  bundle: true,
  target: 'node16.14.0', // electron version target
  loader: {
    '.ts': 'ts',
  },
}
