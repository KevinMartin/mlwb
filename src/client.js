import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import createStore from './redux/create';
import getRoutes from './routes';

const _browserHistory = useScroll(() => browserHistory)();
const dest = document.getElementById('content');
const store = createStore(_browserHistory, window.__data);
const history = syncHistoryWithStore(_browserHistory, store);
const routes = getRoutes(store);

const router = renderProps => (
	<Router {...renderProps}>
		{getRoutes(store)}
	</Router>
);

if (process.env.NODE_ENV !== 'production') {
	window.React = React; // enable debugger

	if (
		!dest ||
		!dest.firstChild ||
		!dest.firstChild.attributes ||
		!dest.firstChild.attributes['data-react-checksum']
	) {
		console.error(
			'Server-side React render was discarded. Make sure that your ' +
			'initial render does not contain any client-side code.'
		);
	}
}

match({ history, routes }, (error, redirectLocation, renderProps) => {
	ReactDOM.render(
		<Provider store={store} key="provider">
			{router(renderProps)}
		</Provider>,
		dest
	);
});
