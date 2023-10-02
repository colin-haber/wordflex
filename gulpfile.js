const gulp = require("gulp");
const zip = require("gulp-zip");
exports.zip = () => {
  return gulp.src("dist/*")
    .pipe(zip("wordflex.zip"))
    .pipe(gulp.dest("./"))
}
