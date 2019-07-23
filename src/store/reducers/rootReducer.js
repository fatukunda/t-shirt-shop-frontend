import { combineReducers } from 'redux';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import singleProductReducer from './singleProductReducer';
import userSignupReducer from './userSignupReducer';
import navBarReducer from './navBarReducer';
import signInReducer from './signInReducer';
import shoppingCartReducer from './shoppingCartReducer';
import customerAddressReducer from './customerAddressReducer';
import ordersReducer from './ordersReducer';

export default combineReducers({
	productReducer,
	categoryReducer,
	singleProductReducer,
	userSignupReducer,
	navBarReducer,
	signInReducer,
	shoppingCartReducer,
	customerAddressReducer,
	ordersReducer,
});
