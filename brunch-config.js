module.exports = {
  files: {
    javascripts: { joinTo: 'app.js' },
    stylesheets: { joinTo: 'app.css' }
  },
  paths: {
    public: 'build',
    watched: ['static']
  },
  plugins: {
    pug: {
      staticPretty: true,
      inlineRuntimeFunctions: false,
      compileDebug: true,
      sourceMap: true,
      cache: false
    },
    babel: { presets: ['es2015'] }
  },
  watcher: {
    usePolling: true
  }
};