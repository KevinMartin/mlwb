import React, { PropTypes } from 'react';
import data from 'decorators/data';
import authDecorator from 'decorators/ensureAccount';

const LoginButton = ({
	componentClass: Component,
	ensureAccount,
	children,
	...props
}) => (
	<Component {...props} onClick={() => ensureAccount(() => null)}>
		Log In / Sign Up
		{children}
	</Component>
);

LoginButton.propTypes = {
	ensureAccount: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	componentClass: PropTypes.string
};

LoginButton.defaultProps = {
	componentClass: 'button'
};

const LogoutButton = ({
	componentClass: Component,
	firebase,
	data: profile,
	...props
}) => (
	<Component {...props} onClick={() => firebase.logout()}>
		Log Out ({profile.username})
	</Component>
);

LogoutButton.propTypes = {
	firebase: PropTypes.object.isRequired,
	data: PropTypes.object,
	componentClass: PropTypes.string
};

LogoutButton.defaultProps = {
	data: null,
	componentClass: 'button'
};

const AuthedLoginButton = authDecorator(LoginButton);

export default data('/auth', {
	Loading: AuthedLoginButton,
	Empty: AuthedLoginButton
})(
	data('/profile', {
		Loading: AuthedLoginButton,
		Empty: AuthedLoginButton
	})(LogoutButton)
);
