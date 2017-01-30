import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';
import { helpers } from 'redux-react-firebase';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
const Html = ({ assets, component, store }) => {
	const content = component ? ReactDOM.renderToString(component) : '';
	const head = Helmet.rewind();
	const state = store.getState();

	if (state && state.firebase) {
		state.firebase = helpers.toJS(state.firebase);
		delete state.firebase.snapshot;
	}

	return (
		<html lang="en">
			<head>
				{head.base.toComponent()}
				{head.title.toComponent()}
				{head.meta.toComponent()}
				{head.link.toComponent()}
				{head.script.toComponent()}

				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

				{/* styles (will be present only in production with webpack extract text plugin) */}
				{Object.keys(assets.styles).map(style => (
					<link
						key={style}
						media="screen, projection"
						href={assets.styles[style]}
						rel="stylesheet"
						type="text/css"
						charSet="UTF-8" />
				))}

				{/* (will be present only in development mode) */}
				{/* can smoothen the initial style flash (flicker) on page load in development mode. */}
				{ Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{ __html: require('bootstrap-loader/no-op') }} /> : null }
			</head>
			<body>
				<div id="content" dangerouslySetInnerHTML={{ __html: content }} />
				<script dangerouslySetInnerHTML={{ __html: `window.__data=${JSON.stringify(state)};` }} charSet="UTF-8" />
				<script src={assets.javascript.main} charSet="UTF-8" />
			</body>
		</html>
	);
};

Html.propTypes = {
	assets: PropTypes.object.isRequired,
	component: PropTypes.node.isRequired,
	store: PropTypes.object.isRequired
};

export default Html;
