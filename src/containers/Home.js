import React, { PropTypes } from 'react';
import { Jumbotron, Post } from 'components';
import data from 'decorators/data';
import { app } from 'config';

const Home = ({ data: posts }) => (
	<div>
		<Jumbotron>
			<h1>{app.title}</h1>
			<h2>{app.description}</h2>
		</Jumbotron>

		<div className="container">
			{Object.keys(posts).map(id => <Post key={id} id={id} post={posts[id]} summary />)}
		</div>
	</div>
);

Home.propTypes = {
	data: PropTypes.object.isRequired
};

export default data(['posts'])(Home);
