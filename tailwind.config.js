import defaultPreset from 'tailwindcss/presets';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  presets: [defaultPreset],
  content: ['./src/**/*.{html,js,svelte,ts}', './src/app.html'],
  plugins: [],
};
