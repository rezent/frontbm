import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    files: {
      routes: './src/app/routes',
    },
    alias: {
      $lib: './src/lib',
      '@/*': './src/*',
      '@shared': './src/shared',
      '@entities': './src/entities',
      '@features': './src/features',
      '@widgets': './src/widgets',
      '@pages': './src/pages',
      '@app': './src/app',
    },
  },
};

export default config;
