import React, { PropTypes } from 'react';
import { PostComment } from 'components';
import styles from './styles.scss';

const PostComments = ({ comments }) => (
	<div className={styles.container}>
		{comments.map(comment => <PostComment comment={comment} />)}
	</div>
);

PostComments.propTypes = {
	comments: PropTypes.array.isRequired
};

export default PostComments;
