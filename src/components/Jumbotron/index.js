import React, { PropTypes } from 'react';
import { Jumbotron } from 'react-bootstrap';
import styles from './styles.scss';

const images = Object.keys(styles).filter(image => image !== 'base');

function getRandomImage() {
	const index = Math.floor(Math.random() * images.length);
	const image = styles[images[index]];

	return `${styles.base} ${image}`;
}

const Jumbo = ({ children }) => (
	<Jumbotron className={getRandomImage()}>
		<div>{children}</div>
	</Jumbotron>
);

Jumbo.propTypes = {
	children: PropTypes.node.isRequired
};

export default Jumbo;
