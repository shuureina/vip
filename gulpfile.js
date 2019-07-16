const gulp = require('gulp'); //引入gulp
const watch = require('gulp-watch'); //引入监听gulp的插件
const minihtml = require('gulp-minify-html'); //引入html的压缩插件
const comfilesass = require('gulp-sass'); //编译sass
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const es2015 = require('babel-preset-es2015');

// 压缩html
gulp.task('uglifyhtml', () => {
    return gulp.src('src/*.html') //引入文件
        .pipe(minihtml()) //执行压缩插件
        .pipe(gulp.dest('dist/')); //输出
});

// // //编译压缩sass-->css
gulp.task('comfilesass', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(comfilesass({ //执行sass编译
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('dist/css'))
});
// //压缩png图片
gulp.task('uglifypng', () => {
    return gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/img'));
});
//压缩/fonts 的js
gulp.task('uglifyjs', () => {
    return gulp.src('src/fonts/font_7htqrw1cgww/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/fonts/font_7htqrw1cgww'));
});
//es6转es5并压缩
gulp.task('babeljs', () => {
    return gulp.src('src/script/*/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/script/'));
});
gulp.task('default', function() {
    //default:默认名称，编译时可以省略
    watch(['src/*.html', 'src/sass/*.scss', 'src/img/*.{png,jpg,gif,ico}', 'src/fonts/font_7htqrw1cgww/*.js', 'src/script/*/*.js'], gulp.parallel('uglifyhtml', 'comfilesass', 'uglifypng', 'uglifyjs', 'babeljs'));
})