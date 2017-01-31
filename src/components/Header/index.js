import React from 'react';
import { IndexLink } from 'react-router';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AuthButton } from 'components';
import config from 'config';
import styles from './styles.scss';

export default () => (
	<Navbar fluid staticTop className={styles.navbar}>
		<Navbar.Header>
			<Navbar.Brand>
				<IndexLink to="/">{config.app.title}</IndexLink>
			</Navbar.Brand>

			<Navbar.Toggle />
		</Navbar.Header>

		<Navbar.Collapse>
			<Nav pullRight>
				<LinkContainer to="/">
					<NavItem>Home</NavItem>
				</LinkContainer>

				<LinkContainer to="/posts/create">
					<NavItem>Create Post</NavItem>
				</LinkContainer>

				<li role="presentation">
					<AuthButton componentClass="a" href="#" className="" />
				</li>
			</Nav>
		</Navbar.Collapse>
	</Navbar>
);
