import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

const PostForm = ({ handleSubmit }) => (
	<form
		onSubmit={handleSubmit}>
		<div className="form-group">
			<label htmlFor="title">Title</label>
			<Field component="input" id="title" name="title" type="text" className="form-control" placeholder="Post Title" />
		</div>

		<div className="form-group">
			<label htmlFor="content">Content</label>
			<Field component="textarea" id="content" name="content" className="form-control" placeholder="Post Content" />
		</div>

		<button type="submit" className="btn btn-primary">Publish</button>
	</form>
);

PostForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
	form: 'post'
})(PostForm);
