import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function getPath(id, action) {
	return `/posts/${id}/${action}`.replace(/\/$/, '');
}

const PostLink = ({ id, action, children }) => (
	<Link to={getPath(id, action)}>{children}</Link>
);

PostLink.propTypes = {
	action: PropTypes.string,
	id: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired
};

PostLink.defaultProps = {
	action: ''
};

export default PostLink;
