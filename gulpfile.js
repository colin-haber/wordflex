const config = require("./webpack.config.js");
const del = require("del");
const gulp = require("gulp");
const sharp = require("gulp-sharp-responsive");
const sri = require("gulp-sri-hash");
const webpack = require("webpack-stream");
const zip = require("gulp-zip");
resizeIcon = () => {
  return gulp.src("src/icon.png")
    .pipe(sharp({
      formats: [
        { width: 64, rename: { suffix: "-64" } },
      ],
    })).pipe(gulp.dest("dist/"));
}
watchIcon = () => gulp.watch([
  "src/icon.png",
], resizeIcon);
copyLocales = () => {
  return gulp.src([
    "i18n/**/*",
  ]).pipe(gulp.dest("dist/_locales/"));
};
watchLocales = () => () => gulp.watch([
  "i18n/**/*",
], copyLocales);
copyResources = () => {
  return gulp.src([
    "src/manifest.json",
  ]).pipe(gulp.dest("dist/"));
};
watchResources = () => gulp.watch([
  "src/manifest.json",
], copyResources);
runWebpack = () => {
  return gulp.src("gulpfile.js")
    .pipe(webpack(config), require("webpack"))
    .pipe(gulp.dest("dist/"));
};
watchWebpack = () => {
  config.watch = true;
  return gulp.src("gulpfile.js")
    .pipe(webpack(config), require("webpack"))
    .pipe(gulp.dest("dist/"));
};
copyHtml = () => {
  return gulp.src([
    "src/action.html",
  ]).pipe(gulp.dest("dist/"));
};
setupSubresourceIntegrity = () => {
  return gulp.src("dist/action.html")
    .pipe(sri())
    .pipe(gulp.dest("dist/"));
};
buildHtml = gulp.series(copyHtml, setupSubresourceIntegrity);
watchHtml = () => gulp.watch([
  "src/action.html",
  "dist/action.js",
], buildHtml);
exports.build = gulp.series(gulp.parallel(copyResources, copyLocales, resizeIcon, runWebpack), buildHtml);
exports.watch = gulp.parallel(watchWebpack, watchResources, watchIcon, watchHtml, watchLocales);
exports.clean = () => {
  return del([
    "dist/**",
    "wordflex.zip",
  ]);
};
exports.zip = () => {
  return gulp.src("dist/**/*")
    .pipe(zip("wordflex.zip"))
    .pipe(gulp.dest("./"));
};
