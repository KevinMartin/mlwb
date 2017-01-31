import React, { PropTypes, PureComponent } from 'react';
import ensureAccount from 'decorators/ensureAccount';

@ensureAccount
export default class AuthenticatedRoute extends PureComponent {
	static propTypes = {
		ensureAccount: PropTypes.func.isRequired,
		children: PropTypes.node.isRequired
	}

	constructor(props, context) {
		super(props, context);

		this.state = {
			authed: false
		};
	}

	componentDidMount() {
		this.props.ensureAccount(auth => this.setState({
			authed: !!auth
		}));
	}

	render() {
		if (this.state.authed) {
			return (
				<div>{this.props.children}</div>
			);
		}

		return (
			<div>
				<h1>401: Unauthorized</h1>
				{this.props.children[1]}
			</div>
		);
	}
}
