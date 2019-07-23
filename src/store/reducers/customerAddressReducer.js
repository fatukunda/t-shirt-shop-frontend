import * as actions from '../actions/customerAddressActions';
export const initialState = {
	customer: {},
	shippingOption: '',
	error: null,
	isLoading: false,
	shipping: {},
};

const customerAddressReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.UPDATE_CUSTOMER_ADDRESS_PENDING:
			return Object.assign({}, state, { isLoading: action.isLoading });
		case actions.UPDATE_CUSTOMER_ADDRESS_SUCCESS:
			return Object.assign({}, state, { customer: action.customer });
		case actions.UPDATE_CUSTOMER_ADDRESS_FAILURE:
			return Object.assign({}, state, { error: action.error });
		case actions.GET_SHIPPING_OPTION:
			return Object.assign({}, state, { shippingOption: action.shippingOption });
		case actions.FETCH_SHIPPING_PENDING:
			return Object.assign({}, state, { isLoading: action.isLoading });
		case actions.FETCH_SHIPPING_SUCCESS:
			return Object.assign({}, state, { shipping: action.shipping });
		case actions.FETCH_SHIPPING_FAILURE:
			return Object.assign({}, state, { error: action.error });
		default:
			return state;
	}
};

export default customerAddressReducer;
