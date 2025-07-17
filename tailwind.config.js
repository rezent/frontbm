import defaultPreset from 'tailwindcss/presets';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  presets: [defaultPreset],
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './src/app.html',
    './src/app/routes/**/*.{svelte,ts}',
    './src/entities/**/*.svelte',
    './src/features/**/*.svelte',
    './src/widgets/**/*.svelte',
    './src/pages/**/*.svelte',
    './src/shared/**/*.svelte'
  ],
  plugins: [],
};
