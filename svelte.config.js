import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      strict: false
    }),
    files: {
      routes: './src/app/routes',
    },
    prerender: {
      entries: ['*']
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
