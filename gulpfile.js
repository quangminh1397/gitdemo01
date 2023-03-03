const gulp = require('gulp');
const del = require('del');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const path = require('path');
const browserSync = require('browser-sync').create();


function copyAsset() {
  return gulp.src(['src/assets/**/*', '!src/assets/js/libs/*']).pipe(gulp.dest('./dist/assets'));
}

function cleanSource() {
  return del(['dist/**', '!dist']);
}

//compile scss into css
function style() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browserSync.stream());
}

//compile jade into html
function html() {
  return gulp.src(['src/pug/**/*.pug', '!src/pug/_layout/*.pug', '!src/pug/_modules/*.pug', '!src/pug/_mixins/*.pug'])
    .pipe(pug({
      doctype: 'html',
      pretty: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
}


// minify libs js
function libJs() {
  return gulp.src('src/assets/js/libs/*.js')
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./dist/assets/js/libs/'));
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    port: 4000
  });
  gulp.watch('src/assets/**/*', copyAsset).on('change', browserSync.reload);
  gulp.watch('src/scss/**/*.scss', style).on('change', browserSync.reload);
  gulp.watch('src/pug/**/*.pug', html).on('change', browserSync.reload);
}



// define complex tasks
const build = gulp.series(cleanSource, style, html, libJs, copyAsset, watch);

// export tasks
exports.cleanSource = cleanSource;
exports.style = style;
exports.html = html;
exports.build = build;
exports.buildJs = libJs;
exports.watch = watch;
exports.default = build;