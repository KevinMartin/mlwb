import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import PrettyError from 'pretty-error';
import http from 'http';
import path from 'path';
import { RouterContext, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';

import config from './config';
import createStore from './redux/create';
import Html from './helpers/Html';
import getRoutes from './routes';

const app = new Express();
const pretty = new PrettyError();
const server = new http.Server(app);

app.use(compression());
app.use(Express.static(path.join(__dirname, '..', 'static')));
app.use(cookieParser());

app.use((req, res) => {
	if (__DEVELOPMENT__) {
		// Do not cache webpack stats: the script file would change since
		// hot module replacement is enabled in the development env
		webpackIsomorphicTools.refresh();
	}

	const memoryHistory = createHistory(req.originalUrl);
	const store = createStore(memoryHistory);
	const history = syncHistoryWithStore(memoryHistory, store);
	const doctype = '<!doctype html>\n';

	function hydrateOnClient() {
		res.send(
			doctype +
			ReactDOM.renderToString(
				<Html
					assets={webpackIsomorphicTools.assets()}
					store={store} />
			)
		);
	}

	if (__DISABLE_SSR__) {
		hydrateOnClient();
		return;
	}

	match({
		history,
		routes: getRoutes(store),
		location: req.originalUrl
	}, (error, redirectLocation, renderProps) => {
		if (redirectLocation) {
			res.redirect(redirectLocation.pathname + redirectLocation.search);
		} else if (error) {
			console.error('ROUTER ERROR:', pretty.render(error));
			res.status(500);
			hydrateOnClient();
		} else if (renderProps) {
			global.navigator = {
				userAgent: req.headers['user-agent']
			};

			if (renderProps.components[renderProps.components.length - 1].name === 'NotFound') {
				res.status(404);
			} else {
				res.status(200);
			}

			const component = (
				<Provider store={store} key="provider">
					<RouterContext {...renderProps} />
				</Provider>
			);

			res.send(
				doctype +
				ReactDOM.renderToString(
					<Html
						assets={webpackIsomorphicTools.assets()}
						component={component}
						store={store} />
				)
			);
		} else {
			res.status(404).send('Not found');
		}
	});
});

if (config.port) {
	server.listen(config.port, (err) => {
		if (err) {
			console.error(err);
		}

		console.info('----\n==> ✅  %s is running.', config.app.title);
		console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
	});
} else {
	console.error('==>     ERROR: No PORT environment variable has been specified');
}
