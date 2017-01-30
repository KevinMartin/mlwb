import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { reduxReactFirebase } from 'redux-react-firebase';
import { fromJS } from 'immutable';
import { firebase as firebaseConfig } from 'config';

export default (history, data) => {
	// Sync dispatched route actions to the history
	const reduxRouterMiddleware = routerMiddleware(history);
	const middleware = [reduxRouterMiddleware];
	const devtools = __DEVELOPMENT__ && __CLIENT__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
	const finalCreateStore = (devtools || compose)(
		reduxReactFirebase({ ...firebaseConfig }),
		applyMiddleware(...middleware)
	)(createStore);

	if (__CLIENT__ && data && data.firebase) {
		data.firebase = fromJS(data.firebase); // eslint-disable-line no-param-reassign
	}

	const reducer = require('./modules/reducer');
	const store = finalCreateStore(reducer, data);

	if (__DEVELOPMENT__ && module.hot) {
		module.hot.accept('./modules/reducer', () => {
			store.replaceReducer(require('./modules/reducer'));
		});
	}

	return store;
};
