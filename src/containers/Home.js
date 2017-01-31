import React, { PropTypes } from 'react';
import { Post } from 'components';
import data from 'decorators/data';

const Home = ({ data: posts }) => (
	<div>
		{Object.keys(posts).map(id => <Post key={id} id={id} post={posts[id]} excerpt />)}
	</div>
);

Home.propTypes = {
	data: PropTypes.object.isRequired
};

export default data(['posts'])(Home);
