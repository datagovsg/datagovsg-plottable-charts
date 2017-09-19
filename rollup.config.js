import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import {minify} from 'uglify-es'

const outputFile = process.env.MINIFY === 'true'
   ? 'lib/datagovsg-charts.min.js'
   : 'lib/datagovsg-charts.js'

const config = {
  input: 'src/lib.js',
  output: {
    file: outputFile,
    format: 'es'
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

if (process.env.MINIFY === 'true') {
  config.plugins.push(uglify({}, minify))
}

export default config
