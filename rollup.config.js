import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json' assert { type: 'json' };
// import { main as packageMain, module as packageModule } from './package.json' assert { type: 'json' };

const { main : packageMain, module : packageModule } = pkg;

export default {
  input: 'src/index.tsx',
  output: [
    { file: packageMain, format: 'cjs', sourcemap: true },
    { file: packageModule, format: 'es', sourcemap: true }
  ],
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    resolve(),
    commonjs(),
    typescript()
  ],
  external: [ 'react', 'prop-types', 'styled-components' ]
}
