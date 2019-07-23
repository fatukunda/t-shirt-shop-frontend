import * as actions from '../actions/userSignInActions';
export const initialState = {
	user: {},
	error: null,
	isLoading: false,
};

const userSigInReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.LOGIN_USER_PENDING:
			return Object.assign({}, state, { isLoading: action.isLoading });
		case actions.LOGIN_USER_SUCCESS:
			return Object.assign({}, state, { user: action.user });
		case actions.LOGIN_USER_FAILURE:
			return Object.assign({}, state, { error: action.error });
		default:
			return state;
	}
};

export default userSigInReducer;
