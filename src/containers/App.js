import React, { PropTypes } from 'react';
import { Header } from 'components';

const App = ({ children }) => (
	<div>
		<Header />
		{children}
	</div>
);

App.propTypes = {
	children: PropTypes.object.isRequired
};

App.contextTypes = {
	store: PropTypes.object.isRequired
};

export default App;
