import React, { Component, PropTypes } from 'react';
import { Header, Sidebar } from 'components';
import styles from './styles.scss';

export default class App extends Component {
	static propTypes = {
		children: PropTypes.object.isRequired
	}

	static contextTypes = {
		store: PropTypes.object.isRequired
	}

	constructor(props, context) {
		super(props, context);

		this.state = {};
	}

	render() {
		return (
			<div className={styles.container}>
				<div className="container">
					<Header />

					<div className={`row ${styles.content}`}>
						<div className="col-xs-12 col-md-9">{this.props.children}</div>
						<Sidebar className="col-xs-12 col-md-3" />
					</div>
				</div>
			</div>
		);
	}
}
