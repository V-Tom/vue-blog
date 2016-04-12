import gulp from 'gulp'
import gutil from 'gulp-util'
import del from 'del'
import WebpackDevServer from "webpack-dev-server"
import webpack from "webpack"

const path = require('path');
const DEV_PORT = 4000, PROD_PORT = 80

const server = (webpackPath, cb)=> {
  let webpackConfig = require(webpackPath)
  let myConfig = Object.create(webpackConfig)
  myConfig.devtool = 'eval-source-map'
  myConfig.debug = true;
  new WebpackDevServer(webpack(myConfig), {
    hot: true,
    inline: true,
    publicPath: '/' + myConfig.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(DEV_PORT, "127.0.0.1", err => {
    if (err) throw new gutil.PluginError("webpack-dev-server", err)
    gutil.log("[webpack-dev-server]", "==> http://127.0.0.1:" + DEV_PORT)
  });
  cb();
};

const build = (webpackPath, cb)=> {
  let webpackConfig = require(webpackPath)
  let myConfig = Object.create(webpackConfig)
  webpack(myConfig, function (err, stats) {
    if (err) throw new gutil.PluginError("webpack", err)
    gutil.log("[webpack]", stats.toString({
      // output options
    }));
    cb()
  })
};
gulp.task('server-dev', cb => {
  server(path.join(__dirname, ''), cb);
});

gulp.task('server-build', cb => {
  build(path.join(__dirname, ''), cb);
});
gulp.task('base-dev', cb => {

});
gulp.task('base-build', cb => {

});
gulp.task('clean', cb => del([path.join(__dirname, '/dist/*')]));
