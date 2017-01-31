import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Jumbotron, Paginate, PostHeader } from 'components';
import dataDecorator from 'decorators/data';
import { app } from 'config';

const postsPerPage = 5;

const Home = ({ params: { page = 1 }, data }) => {
	const posts = Object.keys(data)
		.map(id => ({ ...data[id], id }))
		.sort((postA, postB) => {
			if (postA.datetime < postB.datetime) {
				return 1;
			}

			return -1;
		});

	const visible = posts.slice((page - 1) * postsPerPage, page * postsPerPage);

	return (
		<div>
			<Helmet title="Home" />

			<Jumbotron image="home">
				<h1>{app.title}</h1>
				<h2>{app.description}</h2>
			</Jumbotron>

			<div className="container">
				{visible.map(post => <PostHeader key={post.id} id={post.id} post={post} />)}

				<Paginate
					page={+page}
					hasPrev={page > 1}
					hasNext={posts.length > page * postsPerPage}
					routeTemplate="/page/{page}" />
			</div>
		</div>
	);
};

Home.propTypes = {
	data: PropTypes.object.isRequired,
	params: PropTypes.object.isRequired
};

export default dataDecorator('posts')(Home);
