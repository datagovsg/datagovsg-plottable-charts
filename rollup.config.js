import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import {minify} from 'uglify-es'

const inputFile = 'src/' + process.env.OUTPUT_PATH.replace(/\.min\.js$/, '.js')
const outputFile = process.env.OUTPUT_PATH
const toMinify = /\.min\.js$/.test(process.env.OUTPUT_PATH)

const config = {
  input: inputFile,
  output: {
    file: outputFile,
    format: 'iife'
  },
  plugins: [
    commonjs(),
    resolve(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        ['es2015', {modules: false}],
        'stage-2'
      ],
      plugins: [
        'external-helpers'
      ]
    })
  ]
}

if (toMinify) config.plugins.push(uglify({}, minify))

export default config
