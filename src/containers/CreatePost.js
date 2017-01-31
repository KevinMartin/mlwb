import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Jumbotron, PostForm } from 'components';
import data from 'decorators/data';

const CreatePost = ({ firebase, pushState, data: auth }) => (
	<div>
		<Helmet title="Create Blog Post" />

		<Jumbotron>
			<h1>Create Post</h1>
		</Jumbotron>

		<div className="container">
			<PostForm
				onSubmit={values => firebase.push('posts', {
					...values,
					uid: auth.uid,
					datetime: new Date().toISOString()
				}, () => pushState('/'))} />
		</div>
	</div>
);

CreatePost.propTypes = {
	firebase: PropTypes.object.isRequired,
	pushState: PropTypes.func.isRequired,
	data: PropTypes.shape({
		uid: PropTypes.string.isRequired
	}).isRequired
};

export default connect(() => ({}), { pushState: push })(
	data('/auth')(CreatePost)
);
