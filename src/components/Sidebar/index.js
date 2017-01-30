import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// import styles from './styles.scss';

export default props => (
	<aside {...props}>
		<Nav>
			<LinkContainer to="/">
				<NavItem>Hello</NavItem>
			</LinkContainer>
		</Nav>
	</aside>
);
