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
      staticPretty: true,             // "pretty" for files in staticBasedir
      inlineRuntimeFunctions: false,  // will use the global `pug` variable
      compileDebug: true,             // except for brunch `optimize` mode (production)
      sourceMap: true,                 // ...if Brunch sourceMaps option is enabled
      cache: false
    },
    babel: { presets: ['es2015'] }
  }
};