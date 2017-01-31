import React, { PropTypes, PureComponent } from 'react';
import { Link } from 'react-router';
import { Jumbotron } from 'components';
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
				<Jumbotron>
					<h1>401</h1>
					<h2>Unauthorized</h2>
				</Jumbotron>

				<div className="container text-center">
					<Link to="/">Go to Home</Link>
				</div>

				{this.props.children[1]}
			</div>
		);
	}
}
