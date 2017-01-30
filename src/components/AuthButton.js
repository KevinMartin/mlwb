import React, { PropTypes } from 'react';
import data, { pathToJS } from 'decorators/data';
import authDecorator from 'decorators/ensureAccount';

const AuthButton = ({
	componentClass: Component,
	firebase,
	ensureAccount,
	auth,
	profile,
	children,
	...props
}) => {
	console.log(auth, profile);
	if (auth) {
		return (
			<Component {...props} onClick={() => firebase.logout()}>
				Log Out
				{children}
			</Component>
		);
	}

	return (
		<Component {...props} onClick={() => ensureAccount(() => null)}>
			Log In / Sign Up
			{children}
		</Component>
	);
};

AuthButton.propTypes = {
	firebase: PropTypes.object.isRequired,
	ensureAccount: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	auth: PropTypes.object,
	profile: PropTypes.object,
	componentClass: PropTypes.string
};

AuthButton.defaultProps = {
	auth: null,
	profile: null,
	className: 'btn btn-link',
	componentClass: 'button'
};

export default authDecorator(
	data(({ firebase }) => ({
		auth: pathToJS(firebase, 'auth'),
		profile: pathToJS(firebase, 'profile')
	}))(AuthButton)
);
