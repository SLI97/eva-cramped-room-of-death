const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const ora = require('ora');
const chalk = require('chalk');
const path = require('path');

async function start() {
  let spinner = ora('压缩图片ing~').start();
  return new Promise(resolve => {
    const targetPath = 'docs/**/*.png';
    gulp
      .src(targetPath)
      .pipe(
        imagemin({
          progressive: true,
        }),
      )
      .pipe(gulp.dest('haha/image'))
      .on('end', () => {
        spinner.stop();
        console.log(chalk.green('压缩成功'));
        resolve();
      });
  });
}

gulp.task('default', gulp.series(start));
