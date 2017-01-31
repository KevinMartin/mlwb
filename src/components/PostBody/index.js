import React, { PropTypes } from 'react';
import { PostLink } from 'components';
import styles from './styles.scss';

const PostBody = ({ id, post, excerpt }) => (
	<article className="panel">
		<header>
			<PostLink id={id}>
				<h1>{post.title}</h1>
			</PostLink>
		</header>

		<div className={excerpt ? styles.excerpt : null}>{post.content}</div>

		{excerpt ? <PostLink id={id}>View Full Post</PostLink> : null}
	</article>
);

PostBody.propTypes = {
	id: PropTypes.string.isRequired,
	post: PropTypes.object.isRequired,
	excerpt: PropTypes.bool
};

PostBody.defaultProps = {
	excerpt: false
};

export default PostBody;
