/* eslint-disable no-undef */
const { src, dest, series, watch } = require('gulp');
// const concat = require('gulp-concat');
const pug = require('gulp-pug');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();

const clean = () => {
  return del(['build']);
};

const fonts = () => {
  return src('src/fonts/**/*.{woff,woff2}').pipe(dest('build/fonts'));
};

const video = () => {
  return src('src/video/**/*.{mp4,webm}').pipe(dest('build/video'));
};

const htmlMinify = () => {
  return src('src/**/*.pug')
    .pipe(
      pug({
        doctype: 'html',
        pretty: true,
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        minifyCSS: true,
      })
    )
    .pipe(dest('build'))
    .pipe(browserSync.stream());
};

const sassMinify = () => {
  return src('src/style/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', notify.onError()))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest('build/style'))
    .pipe(browserSync.stream());
};

const scripts = () => {
  return src(['src/js/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(dest('build/js'))
    .pipe(browserSync.stream());
};

const imgRest = () => {
  return src(['src/img/**/*.{png,svg,webp,ico,webmanifest,xml}'])
    .pipe(sourcemaps.init())
    .pipe(dest('build/img'))
    .pipe(sourcemaps.write())
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'build',
    },
  });

  watch('src/**/*.pug', htmlMinify);
  watch('src/style/**/*.scss', sassMinify);
  watch('src/img/**/*.{png,svg,webp,ico,webmanifest,xml}', imgRest);
  watch('src/js/**/*.js', scripts);
};

const projectBuild = (...view) =>
  series(
    clean,
    fonts,
    video,
    htmlMinify,
    sassMinify,
    imgRest,
    scripts,
    ...view
  );

exports.dev = projectBuild(watchFiles);
exports.build = projectBuild();
