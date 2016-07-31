
var gulp = require('gulp');

//引入组件
var minifycss = require('gulp-minify-css'), //css压缩
    uglify = require('gulp-uglify'), //js压缩
    concat = require('gulp-concat'), //合并文件
    rename = require('gulp-rename'), //重命名
    clean = require('gulp-clean'),   //清空文件夹
    minhtml = require('gulp-htmlmin'), //html压缩
    jshint = require('gulp-jshint'),  //js代码规范性检查
    imagemin = require('gulp-imagemin'); //图片压缩

//设置gulp任务
gulp.task('css',function () {
    gulp.src('../css/*.css')
        .pipe(concat('index.min.css'))  //合并成一个名叫resume.min的css文件
        .pipe(minifycss())               //压缩css
        .pipe(gulp.dest('../../dist/css/'));
});

gulp.task('js',function () {
    gulp.src('index.js')
        .pipe(jshint())                  //检查js文件
        .pipe(jshint.reporter('default'))
        .pipe(concat('index.min.js'))     //合并js文件
        .pipe(uglify())                   //压缩js文件
        .pipe(gulp.dest('../../dist/js/'));
});

gulp.task('build',['css','js']); //在此文件的界面使用git bash 输入gulp build 就可以执行这四个任务




//另一个例子
// var gulp = require('gulp');
// var browserSync = require('browser-sync').create();
// var scp = require('gulp-scp2');
// var fs = require('fs');
//
// gulp.task('reload',function () {
//     browserSync.reload();  //重新加载browserSync
// });
// gulp.task('scp',function () {
//    gulp.src('src/**/*')
//        .pipe(scp({
//            host:'121.40.201.213',
//            username:'root',
//            privateKey:fs.readFileSync('/Users/wingo/.ssh/id_rsa'),
//            dest:'/var/www/fe.jirengu.com',
//            watch:function (client) {
//                client.on('write',function (o) {
//                    console.log('write',o.destination);
//                });
//            }
//        }))
//        .on('error',function (err) {
//            console.log(err);
//        })
// });
// gulp.task('server',function () {
//    browserSync.init({
//        server : {
//            baseDir: './src'
//        }
//     });
//     gulp.watch(['**/*.css','**/*.js','**/*.html'],['reload','scp']); //监控这些文件，当这些文件发生变动的时候就会执行下面的两个任务
//     //一个是reload任务，一个是scp任务
// });

