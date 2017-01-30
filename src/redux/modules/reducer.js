import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import { firebaseStateReducer } from 'redux-react-firebase';

export default combineReducers({
	routing,
	form,
	firebase: firebaseStateReducer
});
