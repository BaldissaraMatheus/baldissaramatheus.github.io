const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');
const sass = require('gulp-sass');
const mustache = require('gulp-mustache-plus');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

gulp.task('sass', () => {
  return gulp.src(['src/scss/main.scss'])
    .pipe(sass())
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('mustache', () => {
  return gulp.src(['src/templates/*.mustache'])
    .pipe(mustache({},{},{}))
    .pipe(gulp.dest('dist'));
});

gulp.task('uglify', () => {
  return gulp.src(['src/scripts/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('imagemin', () => {
  return gulp.src(['src/assets/*.png', 'src/assets/*.svg'])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('deploy', () => {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('watch', function(){ 
  gulp.watch(['src/scss/**/*.scss'], gulp.series('sass'));
  gulp.watch(['src/templates/**/*.mustache'], gulp.series('mustache'));
  gulp.watch(['src/scripts/**/*.js'], gulp.series('uglify'));
  gulp.watch(['src/assets/**/*.png', 'src/assets/*.svg'], gulp.series('imagemin'));
});

gulp.task('default', gulp.series(gulp.parallel('sass', 'mustache', 'uglify', 'imagemin'), 'watch'));