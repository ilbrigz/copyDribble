var gulp = require('gulp'), 
sourcemaps = require('gulp-sourcemaps'),
autoprefixer = require('gulp-autoprefixer'),
sass = require('gulp-sass'),
watch = require('gulp-watch'),
wait = require('gulp-wait'),
cssbeautify = require('gulp-cssbeautify'),
rename = require('gulp-rename');
browserSync = require('browser-sync').create();

//sass,prefix,uglify
gulp.task('sass', function () {
  return gulp.src('./sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(wait(100))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))//sass
     .pipe(autoprefixer({
            browsers: ['last 2 versions'],//prefixer
            cascade: false
    }))
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(rename('style.mini.css'))
    .pipe(gulp.dest('./css'))
    .pipe(cssbeautify())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('css/beautified'));
});
 
 gulp.task('watch',['sass'], function() {
    browserSync.init({
    notify: false,
    server: {
        baseDir: "./"
    }
    });

//watch
    watch('./**/*.html', function() {
            browserSync.reload();
        });

    watch('./sass/**/*.scss', function() { 
            gulp.start('cssInject');
        });
 });

//inject
gulp.task('cssInject', ['sass'], function() {
    return gulp.src('css/style.mini.css')
    .pipe(browserSync.stream());
});

gulp.task("default", ['sass','watch']);