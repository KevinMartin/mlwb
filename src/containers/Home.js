import React, { PropTypes } from 'react';
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
			<Jumbotron image="home">
				<h1>{app.title}</h1>
				<h2>{app.description}</h2>
			</Jumbotron>

			<div className="container">
				{visible.map(post => <PostHeader key={post.id} id={post.id} post={post} />)}
			</div>

			<Paginate
				page={+page}
				hasPrev={page > 1}
				hasNext={posts.length > page * postsPerPage}
				routeTemplate="/page/{page}" />
		</div>
	);
};

Home.propTypes = {
	data: PropTypes.object.isRequired,
	params: PropTypes.object.isRequired
};

export default dataDecorator('posts')(Home);
