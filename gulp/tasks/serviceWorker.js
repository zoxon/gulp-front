import swPrecache from 'sw-precache';

const serviceWorker = (callback) => {
	const rootDir = 'dest/';
	const config = {
		staticFileGlobs: [
			rootDir + '**/*.{html,css,js}',
			rootDir + '**/*.{eot,ttf,woff,woff2}',
			rootDir + '**/*.{png,jpg,svg,ico}'
		],
		stripPrefix: 'dest/',
		replacePrefix: '/'
	};

	swPrecache.write('dest/precache.js', config, callback);
};

export default serviceWorker;
