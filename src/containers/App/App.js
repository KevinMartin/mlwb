import React, { Component, PropTypes } from 'react';

export default class App extends Component {
	static contextTypes = {
		store: PropTypes.object.isRequired
	}

	constructor(props, context) {
		super(props, context);

		this.state = {};
	}

	render() {
		return (
			<div>Hello!</div>
		);
	}
}
