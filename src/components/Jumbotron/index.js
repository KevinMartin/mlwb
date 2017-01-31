import React, { PropTypes } from 'react';
import { Jumbotron } from 'react-bootstrap';
import styles from './styles.scss';

function getClass(image) {
	const imageClass = styles[image] || styles.other;

	return `${styles.base} ${imageClass}`;
}

const Jumbo = ({ image, children }) => (
	<Jumbotron className={getClass(image)}>
		<div>{children}</div>
	</Jumbotron>
);

Jumbo.propTypes = {
	image: PropTypes.oneOf(['home', 'post', 'other']),
	children: PropTypes.node.isRequired
};

Jumbo.defaultProps = {
	image: 'other'
};

export default Jumbo;
