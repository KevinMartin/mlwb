import React, { PropTypes } from 'react';
import { PostLink } from 'components';
import styles from './styles.scss';

const PostBody = ({ post, excerpt }) => (
	<article className={[styles.article, excerpt ? styles.excerpt : null]}>
		<header>
			<PostLink id={post.id}>
				<h1>{post.title}</h1>
			</PostLink>
		</header>

		{post.body}

		{excerpt ? <PostLink id={post.id}>View Full Post</PostLink> : null}
	</article>
);

PostBody.propTypes = {
	post: PropTypes.object.isRequired,
	excerpt: PropTypes.bool
};

PostBody.defaultProps = {
	excerpt: false
};

export default PostBody;
