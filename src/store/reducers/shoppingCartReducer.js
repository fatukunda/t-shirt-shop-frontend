import * as actions from '../actions/shoppingCartActions';
export const initialState = {
	cart_id: '',
	error: null,
	cartItem: {},
	isLoading: false,
	cartItemNo: 0,
	cartItems: [],
	grandTotal: 0,
};

const shoppingCartReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.GENERATE_CART_ID_SUCCESS:
			return Object.assign({}, state, { cart_id: action.cart_id });
		case actions.GENERATE_CART_ID_FAILURE:
			return Object.assign({}, state, { error: action.error });
		case actions.ADD_TO_CART_PENDING:
			return Object.assign({}, state, { isLoading: action.isLoading });
		case actions.ADD_TO_CART_SUCCESS:
			return Object.assign({}, state, { cartItem: action.cartItem, cartItemNo: state.cartItemNo + 1 });
		case actions.ADD_TO_CART_FAILURE:
			return Object.assign({}, state, { error: action.error });
		case actions.FETCH_CART_ITEMS_PENDING:
			return Object.assign({}, state, { isLoading: action.isLoading });
		case actions.FETCH_CART_ITEMS_SUCCESS:
			return Object.assign({}, state, { cartItems: action.cartItems });
		case actions.FETCH_CART_ITEMS_FAILURE:
			return Object.assign({}, state, { error: action.error });
		case actions.EMPTY_CART_PENDING:
			return Object.assign({}, state, { isLoading: action.isLoading });
		case actions.EMPTY_CART_SUCCESS:
			return Object.assign({}, state, { cartItems: action.cartItems, cartItemNo: 0 });
		case actions.EMPTY_CART_FAILURE:
			return Object.assign({}, state, { error: action.error });
		case actions.REMOVE_CART_ITEM_PENDING:
			return Object.assign({}, state, { isLoading: action.isLoading });
		case actions.REMOVE_CART_ITEM_SUCCESS:
			return Object.assign({}, state, { cartItemNo: state.cartItemNo - 1 });
		case actions.FETCH_CART_TOTAL_PENDING:
			return Object.assign({}, state, { isLoading: action.isLoading });
		case actions.FETCH_CART_TOTAL_SUCCESS:
			return Object.assign({}, state, { grandTotal: action.grandTotal });
		case actions.FETCH_CART_TOTAL_FAILURE:
			return Object.assign({}, state, { error: action.error });
		default:
			return state;
	}
};

export default shoppingCartReducer;
