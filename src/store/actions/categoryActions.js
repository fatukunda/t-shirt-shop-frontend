import { getResource } from '../../utils/http';

const categoryUrl = 'categories';

export const FETCH_CATEGORY_PENDING = 'FETCH_CATEGORY_PENDING';
export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const FETCH_CATEGORY_FAILURE = 'FETCH_CATEGORY_FAILURE';

export const fetchCategoryPending = isLoading => ({
	type: FETCH_CATEGORY_PENDING,
	isLoading,
});

export const fetchCategorySuccess = categories => ({
	type: FETCH_CATEGORY_SUCCESS,
	categories,
});

export const fetchCategoryFailure = error => ({
	type: FETCH_CATEGORY_FAILURE,
	error,
});

export const fetchCategories = () => dispatch =>
	getResource(categoryUrl)
		.then(response => {
			dispatch(fetchCategorySuccess(response.data));
		})
		.catch(err => {
			dispatch(fetchCategoryFailure(err));
		});
