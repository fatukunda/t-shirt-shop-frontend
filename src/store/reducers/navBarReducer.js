import * as actions from '../actions/navBarActions';
export const initialState = {
	isAuthenticated: false,
};

const navBarReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.AUTHENTICATE:
			return Object.assign({}, state, { isAuthenticated: action.isAuthenticated });
		default:
			return state;
	}
};

export default navBarReducer;
