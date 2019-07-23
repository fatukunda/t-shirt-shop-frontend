import { createResource } from '../../utils/http';
import { authenticate } from './navBarActions';

const loginUrl = 'customers/login';

export const LOGIN_USER_PENDING = 'LOGIN_USER_PENDING';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const loginUserPending = isLoading => ({
	type: LOGIN_USER_PENDING,
	isLoading,
});

export const loginUserSuccess = user => ({
	type: LOGIN_USER_SUCCESS,
	user,
});

export const loginUserFailure = error => ({
	type: LOGIN_USER_FAILURE,
	error,
});

export const loginUser = user => dispatch => {
	dispatch(loginUserPending(true));
	return createResource(loginUrl, user)
		.then(response => {
			dispatch(loginUserPending(false));
			dispatch(loginUserSuccess(response.data));
			localStorage.setItem('auth_token', response.data.access_token);
			dispatch(authenticate(true));
		})
		.catch(err => {
			dispatch(loginUserPending(false));
			dispatch(loginUserFailure(err.response.data));
		});
};
