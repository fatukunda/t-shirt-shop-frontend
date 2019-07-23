import * as actions from '../actions/categoryActions';
export const initialState = {
	categories: [],
	error: null,
	isLoading: false,
};

const categoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.FETCH_CATEGORY_PENDING:
			return Object.assign({}, state, { isLoading: action.isLoading });
		case actions.FETCH_CATEGORY_SUCCESS:
			return Object.assign({}, state, { categories: action.categories });
		case actions.FETCH_CATEGORY_FAILURE:
			return Object.assign({}, state, { error: action.error });
		default:
			return state;
	}
};

export default categoryReducer;
