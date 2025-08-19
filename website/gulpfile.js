import fs from 'fs';
import gulp from 'gulp';
import less from 'gulp-less';
import cleanCSS from 'gulp-clean-css';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import path from 'path';
import browserSync from 'browser-sync';

const sitePort = process.env.PORT || 8787,
	hotPort = process.env.HOTPORT || null, // example 9091
	bs = browserSync.create(),
	rootPath = new URL('./', import.meta.url).pathname,
	jsrcDir = rootPath + 'src/assets/jsrc/',
	jsDest = rootPath + 'assets/js/';

function handleError(err) {
	console.log('\\033[1;37;41m[ERROR!] ' + err.message + '\\033[49m');
}

// GET CURRENT TIMESTAMP AND FORMAT IT
function getFormattedTimestamp() {
	const now = new Date();
	const pad = (n) => n.toString().padStart(2, '0');

	const year = now.getFullYear();
	const month = pad(now.getMonth() + 1);
	const day = pad(now.getDate());
	const hour = pad(now.getHours());
	const minute = pad(now.getMinutes());
	const second = pad(now.getSeconds());

	return `${year}${month}${day}T${hour}${minute}${second}`;
}

// UPDATE JS AND CSS CACHE BUSTING DATE IN globals.js
function updateGlobalDate(type, done) {
	const filePath = `${rootPath}/server/globals.js`;
	const currentDate = getFormattedTimestamp();
	const dateKey = type === 'css' ? 'CSSDATE' : 'JSDATE';

	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) return done(err);

		const regex = new RegExp(`global\\.${dateKey}\\s*=\\s*['"].*?['"]`);
		const updated = data.replace(regex, `global.${dateKey} = 'v=${currentDate}'`);

		fs.writeFile(filePath, updated, 'utf8', (err) => {
			if (err) return done(err);
			console.log(`${dateKey} updated to: ${currentDate}`);
			done();
		});
	});
}

// COMPILE LESS
gulp.task('less', function (done) {
	let compiledFiles = [];

	gulp.src(['./src/assets/less/**/*.less', '!./src/assets/less/seo.less', '!./src/assets/less/normalize.less'])
		.pipe(less().on('error', function (err) {
			console.error('LESS Error:', err.message);
			done(err);
		}))
		.pipe(cleanCSS())
		.on('data', function (file) {
			// Store each file path as it's processed
			compiledFiles.push(file.path);
		})
		.pipe(gulp.dest('./assets/css'))
		.on('error', handleError)
		.on('end', () => {
			console.log('LESS COMPILED');
			compiledFiles.forEach(file => {
				console.log(` - ${path.relative(process.cwd(), file)}`);
			});

			if (hotPort) bs.reload();
			updateGlobalDate('css', done)
		});
});

// COMPILE JS
gulp.task('browserify', function (filepath, done) {
	var file_path = path.relative(jsrcDir, filepath),
		entryPoint = jsrcDir + file_path;

	browserify({
		entries: entryPoint,
		debug: true,
		paths: [jsDest, rootPath + '/assets/']
	})
		.transform("babelify", {
			presets: ["@babel/preset-env"]
		})
		.bundle()
		.on('error', function (err) {
			console.error('Browserify Error:', err.message);
			this.emit('end');  // End the stream to avoid hanging
			done(err);         // Signal completion with error
		})
		.pipe(source(file_path))
		.pipe(gulp.dest(jsDest))
		.on('end', () => {
			console.log('JS COMPILED: ', entryPoint);
			if (hotPort) bs.reload();
			updateGlobalDate('js', done)
		});
});

gulp.task('watch', function (done) {
	gulp.watch(['./src/assets/less/**/*.less', '!./src/assets/less/seo.less', '!./src/assets/less/normalize.less'], gulp.series('less'));
	gulp.watch(['./src/assets/jsrc/**/*.js', '!./src/assets/jsrc/lib/*'])
		.on('change', function (filepath) {
			console.log('JS file changed:', filepath);
			gulp.task('browserify')(filepath, done); 
		});
});

gulp.task('once', gulp.series('less', (done) => {
	gulp.src(['./src/assets/jsrc/**/*.js', '!./src/assets/jsrc/lib/*'])
		.on('data', (file) => {
			gulp.task('browserify')(file, done);
		})
})
);

gulp.task('serve', function (done) {
	if (hotPort) {

		console.log(hotPort, sitePort);

		bs.init({
			proxy: `http://localhost:${sitePort}`,
			port: hotPort,            // You’ll browse at this port
			open: false,           // Don't auto-open browser
			notify: false,
			ui: false
		});

		// Watch built CSS + JS
		gulp.watch('./assets/css/**/*.css').on('change', bs.reload);
		gulp.watch('./assets/js/**/*.js').on('change', bs.reload);
		gulp.watch('./**/*.html').on('change', bs.reload);
		gulp.watch('./src/assets/less/atf_global.less').on('change', bs.reload);
	}

	done();
});

gulp.task('default', gulp.series('less', gulp.parallel('watch', 'serve')));
