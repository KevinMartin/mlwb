import React, { PropTypes, PureComponent } from 'react';
import { Modal } from 'react-bootstrap';
import data, { pathToJS } from 'decorators/data';
import { AuthForm } from 'components';

export default (WrappedComponent) => {
	class EnsureAccount extends PureComponent {
		static displayName = `EnsureAccount(${WrappedComponent.displayName || WrappedComponent.name})`

		static propTypes = {
			auth: PropTypes.object,
			children: PropTypes.oneOfType([
				PropTypes.arrayOf(PropTypes.node),
				PropTypes.node
			])
		}

		static defaultProps = {
			auth: null,
			children: null
		}

		constructor(props, context) {
			super(props, context);

			this.state = {
				isOpen: false
			};
		}

		componentWillReceiveProps(nextProps) {
			if (this.callback && nextProps.auth) {
				this.setState({
					isOpen: false
				});

				this.callback(nextProps.auth);
				this.callback = null;
			}
		}

		ensureAccount(callback) {
			if (this.props.auth) {
				callback(this.props.auth);
				return;
			}

			this.callback = callback;

			this.setState({
				isOpen: true
			});
		}

		handleClose() {
			this.setState({
				isOpen: false
			});
		}

		render() {
			const { children, ...props } = this.props;

			return (
				<WrappedComponent {...props} ensureAccount={::this.ensureAccount}>
					{children}

					<Modal
						keyboard
						show={this.state.isOpen}
						onHide={::this.handleClose}>
						<Modal.Header>
							<Modal.Title>Log In or Sign Up</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<AuthForm />
						</Modal.Body>
					</Modal>
				</WrappedComponent>
			);
		}
	}

	return data(({ firebase }) => ({
		auth: pathToJS(firebase, 'auth')
	}))(EnsureAccount);
};
