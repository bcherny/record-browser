import typescript from 'rollup-plugin-typescript'
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: './src/index.ts',
  external: ['lodash', 'react', 'react-dom'],
  dest: './dist/bundle.js',
  format: 'iife',
  globals: {
    lodash: '_',
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  moduleName: 'record-browser',
  plugins: [
    commonjs(),
    // nodeResolve({
    //   jsnext: true,
    //   main: true
    // }),
    typescript({ typescript: require('typescript') })
  ]
}