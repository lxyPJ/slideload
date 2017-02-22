var gulp = require("gulp"),
    del = require("del"),
    sequence = require("gulp-sequence"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename");

gulp.task("clean",function(cb){
    del.sync("dist/");
    cb();
});
gulp.task("concat",function(){
    return gulp.src([
            "src/open.js",
            "src/dependence/tween.js",
            "src/core.js",
            "src/close.js"
        ])
        .pipe(concat("slideload.js"))
        .pipe(gulp.dest("dist/"));
});
gulp.task("uglify",function(){
    return gulp.src([
            "src/open.js",
            "src/dependence/tween.js",
            "src/core.js",
            "src/close.js"
        ])
        .pipe(concat("slideload.js"))
        .pipe(rename({ suffix:".min" }))
        .pipe(uglify())
        .pipe(gulp.dest("dist/"));
});

gulp.task("default",sequence("clean","concat","uglify"));