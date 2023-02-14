const { src, dest } = required("gulp");
const browserSync = require('browser-sync').create();

task('server', () => {
  browserSync.init({
      server: {
          baseDir: "./dist"
      }
  });
});