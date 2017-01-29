require('babel-polyfill');

const host = process.env.HOST || 'localhost';

const environment = {
	development: {
		apiHost: host,
		apiPort: 8080,
		socketUrl: `http://${host}:8080`,
	},
	production: {
		apiHost: host,
		apiPort: 443,
		socketUrl: `https://${host}`,
	}
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
	host,
	port: process.env.PORT || 8000,
	app: {
		title: 'Blog',
		description: 'My Blog',
		head: {
			titleTemplate: '%s | Blog',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'description', content: 'My Blog' },
			],
			link: [
				{ href: 'https://fonts.googleapis.com/css?family=Arimo:400,400i,700', rel: 'stylesheet' }
			]
		}
	}
}, environment);
