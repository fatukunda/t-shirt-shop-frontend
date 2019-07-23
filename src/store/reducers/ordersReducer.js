import * as actions from '../actions/ordersActions';
export const initialState = {
	order_id: null,
	error: null,
	isLoading: false,
	chargeInfo: {},
};

const ordersReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.CREATE_ORDER_PENDING:
			return Object.assign({}, state, { isLoading: action.isLoading });
		case actions.CREATE_ORDER_SUCCESS:
			return Object.assign({}, state, { order_id: action.order_id });
		case actions.CREATE_ORDER_FAILURE:
			return Object.assign({}, state, { error: action.error });
		case actions.CHARGE_PENDING:
			return Object.assign({}, state, { isLoading: action.isLoading });
		case actions.CHARGE_SUCCESS:
			return Object.assign({}, state, { chargeInfo: action.chargeInfo });
		case actions.CHARGE_FAILURE:
			return Object.assign({}, state, { error: action.error });
		default:
			return state;
	}
};

export default ordersReducer;
