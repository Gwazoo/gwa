var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');



// VIEW MANAGEMENT
var views = {
	"main": {
		styles: [
			"public/css/main.css",
			//"public/css/test.css",
		],
		scripts: [],
	},
	"404": {
		styles: ["public/css/404.css"],
		scripts: [],
	},
};

var baseStyles = [
	"public/css/reset.css"
];




// GLOBAL FUNCTIONS
function styles(view, renameFile) {
	return gulp.src( baseStyles.concat(views[view].styles) )
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(concat("styles.css"))
	//.pipe(sass())
	.pipe(sourcemaps.write())
	.pipe(autoprefixer())
	.pipe(minifyCss())
	.pipe(rename(renameFile))
	.pipe(gulp.dest('public/css'));
}

// function scripts(view, renameFile) {
// 	var _scripts = (["src/scripts/libs/*.js"]).concat(views[view].scripts);
// 	console.log("_scripts=>",_scripts)
// 	return gulp.src( (["src/scripts/libs/*.js"]).concat(views[view].scripts) )
// 	.pipe(plumber())
// 	.pipe(uglify())
// 	.pipe(concat(renameFile))
// 	.pipe(gulp.dest("public/scripts"));
// }

// function linter(view) {
// 	return gulp.src( views[view].scripts )
// 	.pipe(plumber())
// 	.pipe(eslint({"configFile": ".eslintrc"}))
// 	.pipe(eslint.format())
// 	.pipe(eslint.failOnError());
// }





// STYLE TASKS
gulp.task('mainStyles', function(){
	return styles("main", "main.min.css");
});

gulp.task('404Styles', function(){
	return styles("404", "404.min.css");
});





// SCRIPT TASKS
// gulp.task('homeScripts', ['homeLinter'], function(){
// 		return scripts("home", "scripts.min.js");
// });

// gulp.task('homeLinter', function(){
// 	return linter("home");
// });



// WATCH TASK
gulp.task('watch', function(){
	gulp.watch("public/css/*.scss", ["mainStyles, 404Styles"]);
	// gulp.watch("src/scripts/*.js", ["homeScripts"]);
});


// DEFAULT TASK
//gulp.task('default', ["mainStyles", "404Styles", "homeScripts", "watch"]);
gulp.task('default', ["mainStyles", "404Styles", "watch"]);

