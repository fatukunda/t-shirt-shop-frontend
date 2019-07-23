import { getResource } from '../../utils/http';

const productsUrl = 'products';
const productCategoryUrl = 'products/incategory';

export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const FETCH_SINGLE_PRODUCT_PENDING = 'FETCH_SINGLE_PRODUCT_PENDING';
export const FETCH_SINGLE_PRODUCT_SUCCESS = 'FETCH_SINGLE_PRODUCT_SUCCESS';
export const FETCH_SINGLE_PRODUCT_FAILURE = 'FETCH_SINGLE_PRODUCT_FAILURE';
export const SET_SELECTED_COLOR = 'SET_SELECTED_COLOR';
export const SET_SELECTED_SIZE = 'SET_SELECTED_SIZE';

export const fetchProductsPending = isLoading => ({
	type: FETCH_PRODUCTS_PENDING,
	isLoading,
});

export const fetchProductsSuccess = products => ({
	type: FETCH_PRODUCTS_SUCCESS,
	products,
});

export const fetchProductsFailure = error => ({
	type: FETCH_PRODUCTS_FAILURE,
	error,
});

export const fetchSingleProductPending = isLoading => ({
	type: FETCH_SINGLE_PRODUCT_PENDING,
	isLoading,
});

export const fetchSingleProductSuccess = product => ({
	type: FETCH_SINGLE_PRODUCT_SUCCESS,
	product,
});

export const fetchSingleProductFailure = error => ({
	type: FETCH_SINGLE_PRODUCT_FAILURE,
	error,
});

export const setSelectedColor = color => ({
	type: SET_SELECTED_COLOR,
	color,
});

export const setSelectedSize = size => ({
	type: SET_SELECTED_SIZE,
	size,
});
export const fetchProducts = () => dispatch =>
	//Fetch all products
	getResource(productsUrl)
		.then(response => {
			dispatch(fetchProductsSuccess(response.data));
		})
		.catch(err => {
			dispatch(fetchProductsFailure(err));
		});

export const fetchProductsByCategory = category_id => dispatch => {
	// Fetch products by category
	getResource(`${productCategoryUrl}/${category_id}`)
		.then(response => {
			dispatch(fetchProductsSuccess(response.data));
		})
		.catch(err => {
			dispatch(fetchProductsFailure(err));
		});
};

export const fetchSingleProduct = product_id => dispatch => {
	// Fetch a single product
	getResource(`${productsUrl}/${product_id}/details`)
		.then(response => {
			dispatch(fetchSingleProductSuccess(response.data));
		})
		.catch(err => {
			dispatch(fetchSingleProductFailure(err));
		});
};

