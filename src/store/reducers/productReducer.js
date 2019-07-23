import * as actions from '../actions/productActions';
export const initialState = {
	products: {},
	error: null,
	isLoading: false,
};

const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.FETCH_PRODUCTS_PENDING:
			return Object.assign({}, state, { isLoading: action.isLoading });
		case actions.FETCH_PRODUCTS_SUCCESS:
			return Object.assign({}, state, { products: action.products });
		case actions.FETCH_PRODUCTS_FAILURE:
			return Object.assign({}, state, { error: action.error });
		default:
			return state;
	}
};

export default productReducer;
