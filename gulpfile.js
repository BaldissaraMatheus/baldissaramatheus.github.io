const gulp = require('gulp');
const rename = require('gulp-rename');
const nunjucksRender = require('gulp-nunjucks-render');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

gulp.task('nunjucks', () => {
  return gulp.src('src/views/pages/**/*.nunjucks')
    .pipe(nunjucksRender({
      path: ['src/views/templates']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', () => {
  return gulp.src(['src/scss/main.scss'])
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('uglify', () => {
  return gulp.src(['src/scripts/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('imagemin', () => {
  return gulp.src(['src/assets/*.png', 'src/assets/*.svg', 'src/assets/*.jpg'])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('watch', function(){ 
  gulp.watch(['src/scss/**/*.scss'], gulp.series('sass'));
  gulp.watch(['src/views/**/*.nunjucks'], gulp.series('nunjucks'));
  gulp.watch(['src/scripts/**/*.js'], gulp.series('uglify'));
  gulp.watch(['src/assets/**/*.png', 'src/assets/*.svg', 'src/assets/*.jpg'], gulp.series('imagemin'));
});

gulp.task('default', gulp.series(gulp.parallel('sass', 'nunjucks', 'uglify', 'imagemin'), 'watch'));