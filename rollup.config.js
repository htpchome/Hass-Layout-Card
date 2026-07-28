import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const dev = process.env.ROLLUP_WATCH === 'true';

export default {
  input: 'src/hass-layout-card.ts',
  output: {
    file: 'dist/hass-layout-card.js',
    format: 'es',
    sourcemap: dev,
  },
  plugins: [
    resolve({
      browser: true,
    }),
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: dev,
    }),
    !dev && terser({
      ecma: 2022,
      module: true,
      compress: {
        passes: 2,
      },
      mangle: true,
      format: {
        comments: false,
      },
    }),
  ],
  watch: {
    clearScreen: false,
  },
};