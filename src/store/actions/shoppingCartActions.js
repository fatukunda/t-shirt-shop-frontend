import { getResource, createResource, removeResource } from '../../utils/http';

const cartUrl = 'shoppingcart/generateuniqueid';
const addToCartUrl = 'shoppingcart/add';
const cartItemsUrl = 'shoppingcart';
const cartAmount = 'shoppingcart/totalamount';

export const GENERATE_CART_ID_SUCCESS = 'GENERATE_CART_ID_SUCCESS';
export const GENERATE_CART_ID_FAILURE = 'GENERATE_CART_ID_FAILURE';
export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_TO_CART_PENDING = 'ADD_TO_CART_PENDING';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';
export const FETCH_CART_ITEMS_PENDING = 'FETCH_CART_ITEMS_PENDING';
export const FETCH_CART_ITEMS_SUCCESS = 'FETCH_CART_ITEMS_SUCCESS';
export const FETCH_CART_ITEMS_FAILURE = 'FETCH_CART_ITEMS_FAILURE';
export const EMPTY_CART_PENDING = 'EMPTY_CART_PENDING';
export const EMPTY_CART_SUCCESS = 'EMPTY_CART_SUCCESS';
export const EMPTY_CART_FAILURE = 'EMPTY_CART_FAILURE';
export const REMOVE_CART_ITEM_PENDING = 'REMOVE_CART_ITEM_PENDING';
export const REMOVE_CART_ITEM_SUCCESS = 'REMOVE_CART_ITEM_SUCCESS';
export const REMOVE_CART_ITEM_FAILURE = 'REMOVE_CART_ITEM_FAILURE';
export const FETCH_CART_TOTAL_PENDING = 'FETCH_CART_TOTAL_PENDING';
export const FETCH_CART_TOTAL_SUCCESS = 'FETCH_CART_TOTAL_SUCCESS';
export const FETCH_CART_TOTAL_FAILURE = 'FETCH_CART_TOTAL_FAILURE';

export const generateCartIdSuccess = cart_id => ({
	type: GENERATE_CART_ID_SUCCESS,
	cart_id,
});

export const generateCartIdFailure = error => ({
	type: GENERATE_CART_ID_FAILURE,
	error,
});

export const addToCartPending = isLoading => ({
	type: ADD_TO_CART_PENDING,
	isLoading,
});

export const addToCartSuccess = cartItem => ({
	type: ADD_TO_CART_SUCCESS,
	cartItem,
});

export const addToCartFailure = error => ({
	type: ADD_TO_CART_FAILURE,
	error,
});

export const fetchCartItemsPending = isLoading => ({
	type: FETCH_CART_ITEMS_PENDING,
	isLoading,
});

export const fetchCartItemsSuccess = cartItems => ({
	type: FETCH_CART_ITEMS_SUCCESS,
	cartItems,
});

export const fetchCartItemsFailure = error => ({
	type: FETCH_CART_ITEMS_FAILURE,
	error,
});

export const emptyCartPending = isLoading => ({
	type: EMPTY_CART_PENDING,
	isLoading,
});

export const emptyCartSuccess = cartItems => ({
	type: EMPTY_CART_SUCCESS,
	cartItems,
});

export const emptyCartFailure = error => ({
	type: EMPTY_CART_FAILURE,
	error,
});

export const removeCartItemPending = isLoading => ({
	type: REMOVE_CART_ITEM_PENDING,
	isLoading,
});
export const removeCartItemSuccess = () => ({
	type: REMOVE_CART_ITEM_SUCCESS,
});
export const removeCartItemFailure = error => ({
	type: REMOVE_CART_ITEM_FAILURE,
	error,
});

export const fetchCartTotalPending = isLoading => ({
	type: FETCH_CART_TOTAL_PENDING,
	isLoading,
});
export const fetchCartTotalSuccess = grandTotal => ({
	type: FETCH_CART_TOTAL_SUCCESS,
	grandTotal,
});
export const fetchCartTotalFailure = error => ({
	type: FETCH_CART_TOTAL_FAILURE,
	error,
});

export const generateCartId = () => dispatch => {
	// Generate Cart Id
	getResource(`${cartUrl}`)
		.then(response => {
			dispatch(generateCartIdSuccess(response.data.cart_id));
		})
		.catch(err => {
			dispatch(generateCartIdFailure('Cart not created'));
		});
};

export const addToCart = item => dispatch => {
	dispatch(addToCartPending(true));
	return createResource(`${addToCartUrl}`, item)
		.then(response => {
			dispatch(addToCartSuccess(response.data));
			dispatch(addToCartPending(false));
		})
		.catch(err => {
			dispatch(addToCartFailure(err.response));
			dispatch(addToCartPending(false));
		});
};

export const fetchCartItems = cartId => dispatch => {
	dispatch(fetchCartItemsPending(true));
	return getResource(`${cartItemsUrl}/${cartId}`)
		.then(response => {
			dispatch(fetchCartItemsSuccess(response.data));
			dispatch(fetchCartItemsPending(false));
		})
		.catch(err => {
			dispatch(fetchCartItemsFailure(err.response));
			dispatch(fetchCartItemsPending(false));
		});
};

export const emptyCart = cartId => dispatch => {
	dispatch(emptyCartPending(true));
	return removeResource(`${cartItemsUrl}/empty/${cartId}`)
		.then(response => {
			dispatch(emptyCartSuccess(response.data));
			dispatch(emptyCartPending(false));
		})
		.catch(err => {
			dispatch(emptyCartFailure(err.response));
			dispatch(emptyCartPending(false));
		});
};

export const removeCartItem = item_id => dispatch => {
	dispatch(removeCartItemPending(true));
	return removeResource(`${cartItemsUrl}/removeproduct/${item_id}`)
		.then(response => {
			dispatch(removeCartItemSuccess(response.data));
			dispatch(removeCartItemPending(false));
		})
		.catch(err => {
			dispatch(removeCartItemFailure(err.response));
			dispatch(removeCartItemPending(false));
		});
};

export const fetchGrandTotal = () => dispatch => {
	dispatch(fetchCartItemsPending(true));
	return getResource(`${cartAmount}/${localStorage.getItem('cart_id')}`)
		.then(res => {
			dispatch(fetchCartTotalSuccess(res.data.total_amount));
			dispatch(fetchCartTotalPending(false));
		})
		.catch(err => {
			dispatch(fetchCartItemsFailure(err.response));
			dispatch(fetchCartItemsPending(false));
		});
};
