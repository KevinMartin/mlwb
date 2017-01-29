import React from 'react';
import { Route } from 'react-router';
// import { isLoaded as isAuthLoaded, load as loadAuth, setReferralCode } from 'redux/modules/auth';
import {
	App
} from 'containers';

export default () => {
	const requireLogin = (nextState, replace, cb) => {
		// function checkAuth() {
		// 	const { auth: { user } } = store.getState();
		//
		// 	if (!user) {
		// 		// oops, not logged in, so can't be here!
		// 		replace({
		// 			pathname: '/login',
		// 			state: {
		// 				nextPathname: nextState.location.pathname
		// 			}
		// 		});
		// 	}
		//
		// 	cb();
		// }
		//
		// if (!isAuthLoaded(store.getState())) {
		// 	store.dispatch(loadAuth())
		// 		.catch(() => null)
		// 		.then(checkAuth);
		// } else {
		// 	checkAuth();
		// }
		cb();
	};

	return (
		<Route path="/" component={App}>
			{/* <IndexRoute component={Home} /> */}

			<Route onEnter={requireLogin} />
		</Route>
	);
};
