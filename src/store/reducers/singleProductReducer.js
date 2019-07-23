import * as actions from '../actions/productActions';
export const initialState = {
	product: {},
	error: null,
	isLoading: false,
	selectedSize: '',
	selectedColor: '',
};

const singleProductReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.FETCH_SINGLE_PRODUCT_PENDING:
			return Object.assign({}, state, { isLoading: action.isLoading });
		case actions.FETCH_SINGLE_PRODUCT_SUCCESS:
			return Object.assign({}, state, { product: action.product });
		case actions.FETCH_SINGLE_PRODUCT_FAILURE:
			return Object.assign({}, state, { error: action.error });
		case actions.SET_SELECTED_COLOR:
			return Object.assign({}, state, { selectedColor: action.color });
		case actions.SET_SELECTED_SIZE:
			return Object.assign({}, state, { selectedSize: action.size });
		default:
			return state;
	}
};

export default singleProductReducer;
