import React, { PropTypes } from 'react';
import { Header, Sidebar } from 'components';
import styles from './styles.scss';

const App = ({ children }) => (
	<div className={styles.container}>
		<div className="container">
			<Header />

			<div className={`row ${styles.content}`}>
				<div className="col-xs-12 col-md-9">{children}</div>
				<Sidebar className="col-xs-12 col-md-3" />
			</div>
		</div>
	</div>
);

App.propTypes = {
	children: PropTypes.object.isRequired
};

App.contextTypes = {
	store: PropTypes.object.isRequired
};

export default App;
