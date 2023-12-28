const {MINIFY} = process.env;
const minified = MINIFY === 'true';
const outputFile = minified ? 'dist/mapbox-gl-draw.js' : 'dist/mapbox-gl-draw-unminified.js';

import buble from '@rollup/plugin-buble';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import {terser} from 'rollup-plugin-terser';

export default {
  input: ['index.js'],
  output: {
    name: 'MapboxDraw',
    file: outputFile,
    format: 'es',
    sourcemap: true,
    indent: false
  },
  treeshake: true,
  plugins: [
    replace({
      'process.env.NODE_ENV': "'browser'",
      preventAssignment: true
    }),
    buble({transforms: {dangerousForOf: true}, objectAssign: "Object.assign"}),
    minified ? terser() : false,
    resolve({
      browser: true,
      preferBuiltins: true
    }),
    commonjs({
      // global keyword handling causes Webpack compatibility issues, so we disabled it:
      // https://github.com/mapbox/mapbox-gl-js/pull/6956
      ignoreGlobal: true
    })
  ],
};
