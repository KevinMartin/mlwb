import React from 'react';
import { IndexLink } from 'react-router';
import { Nav, Navbar, NavItem, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AuthButton } from 'components';
import config from 'config';

export default () => (
	<Navbar fluid>
		<Row>
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

					<li role="presentation">
						<AuthButton componentClass="a" href="#" className="" />
					</li>
				</Nav>
			</Navbar.Collapse>
		</Row>
	</Navbar>
);
