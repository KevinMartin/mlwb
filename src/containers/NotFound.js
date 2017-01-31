import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { Jumbotron } from 'components';

export default () => (
	<div>
		<Helmet title="Not Found" />

		<Jumbotron>
			<h1>404</h1>
			<h2>Not Found</h2>
		</Jumbotron>

		<div className="container text-center">
			<Link to="/">Go to Home</Link>
		</div>
	</div>
);
