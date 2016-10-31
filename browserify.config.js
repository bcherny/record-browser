require('browserify')({
  entries: ['./src/index.tsx'],
  extension: ['js', 'ts', 'tsx']
  // external: ['lodash', 'react', 'react-dom']
})
.plugin('tsify', {typescript: require('typescript')})
// .transform('browserify-shim')
.bundle()
.on('error', error => console.error(error.toString()))
.on('log', msg => console.info(msg))
.pipe(process.stdout)