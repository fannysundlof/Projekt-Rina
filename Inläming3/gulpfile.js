var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
 
gulp.task('compress', function () {
  return pipeline(
        gulp.src('*.js'),
        uglify(),
        gulp.dest('dist')
  );
});

var concat = require('gulp-concat');
var CSS_PATH = "styles/SASS/*.scss"
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
 
sass.compiler = require('node-sass');

gulp.task('styles', async function() {
    console.log("styles is running");
  return gulp.src(CSS_PATH)
    .pipe(plumber(function(err) {
        console.log("styles error", err);
    }))
    .pipe(autoprefixer())
    .pipe(concat("styles.css"))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest("styles/CSS"));
});

gulp.task('watch', function () {
    gulp.watch(CSS_PATH, gulp.series("styles"));
  });


 var cleanCSS = require('gulp-clean-css');

gulp.task('minify', () => {
    return gulp.src('styles/CSS/*.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('styles/CSS'));
  });