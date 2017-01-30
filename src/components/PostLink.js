import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const PostLink = ({ id, children }) => (
	<Link to={`/post/${id}`} className="btn btn-link">{children}</Link>
);

PostLink.propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired
};

export default PostLink;
