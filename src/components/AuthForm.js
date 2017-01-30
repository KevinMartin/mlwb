import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import data, { pathToJS } from 'decorators/data';

const signupHandler = ({ handleSubmit, firebase }) => handleSubmit(
	values => firebase.createUser(values, {
		username: values.email.split('@')[0]
	})
);

const AuthForm = props => (
	<form onSubmit={props.handleSubmit(props.firebase.login)}>
		{ props.authError ? <p>{props.authError.toString()}</p> : null }

		<div className="form-group">
			<label htmlFor="email">Email Address</label>
			<Field component="input" id="email" name="email" type="email" className="form-control" placeholder="Email Address" />
		</div>

		<div className="form-group">
			<label htmlFor="password">Password</label>
			<Field component="input" id="password" name="password" type="password" className="form-control" placeholder="Password" />
		</div>

		<div className="row">
			<div className="col-xs-6">
				<button type="submit" className="btn btn-primary btn-block btn-lg">Log In</button>
			</div>

			<div className="col-xs-6">
				<button type="submit" className="btn btn-default btn-block btn-lg" onClick={signupHandler(props)}>Sign Up</button>
			</div>
		</div>
	</form>
);

AuthForm.propTypes = {
	firebase: PropTypes.object.isRequired,
	authError: PropTypes.any,
	handleSubmit: PropTypes.func.isRequired
};

AuthForm.defaultProps = {
	authError: null
};

export default reduxForm({
	form: 'signup'
})(
	data(({ firebase }) => ({
		authError: pathToJS(firebase, 'authError')
	}))(AuthForm)
);
