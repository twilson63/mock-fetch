import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

import pkg from './package.json'

export default [{
  input: './src/index.js',
  output: [
    {file: pkg.module, format: 'esm' },
    {file: pkg.main, format: 'cjs' }
  ],
  plugins: [
    resolve()
  ]
}, {
  input: './test/src/main.js',
  output: {
    file: './test/public/bundle.js',
    format: 'iife',
    name: 'TestMock'
  },
  plugins: [
    resolve(),
    commonjs()
  ]
}]
