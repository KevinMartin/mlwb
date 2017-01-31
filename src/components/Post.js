import React, { PropTypes } from 'react';
import { PostLink } from 'components';
import markdownIt from 'markdown-it';

const md = markdownIt('commonmark');

const Post = ({ id, post, summary }) => (
	<article>
		{ summary
			? <PostLink id={id}>View Full Post</PostLink>
			: <div dangerouslySetInnerHTML={{ __html: md.render(post.content) }} /> // eslint-disable-line
		}
	</article>
);

Post.propTypes = {
	id: PropTypes.string.isRequired,
	post: PropTypes.object.isRequired,
	summary: PropTypes.bool
};

Post.defaultProps = {
	summary: false
};

export default Post;
