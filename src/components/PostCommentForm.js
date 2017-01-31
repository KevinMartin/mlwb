import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import authDecorator from 'decorators/ensureAccount';

const PostForm = ({ postId, firebase, handleSubmit, ensureAccount, children }) => {
	const doSubmit = (event) => {
		event.preventDefault();
		ensureAccount((auth) => {
			handleSubmit(values => firebase.push(`/posts/${postId}/comments`, {
				...values,
				uid: auth.uid,
				datetime: new Date().toISOString()
			}))();
		});
	};

	return (
		<form
			className="panel"
			onSubmit={doSubmit}>
			<div className="form-group">
				<label htmlFor="comment">Comment</label>
				<Field component="textarea" id="comment" name="content" className="form-control" placeholder="Comment" />
			</div>

			<button type="submit" className="btn btn-primary">Publish</button>

			{children}
		</form>
	);
};

PostForm.propTypes = {
	postId: PropTypes.string.isRequired,
	firebase: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	ensureAccount: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired
};
export default reduxForm({
	form: 'post'
})(
	authDecorator(PostForm)
);
