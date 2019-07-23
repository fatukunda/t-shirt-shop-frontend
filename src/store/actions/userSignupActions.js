import { createResource } from '../../utils/http';
import { authenticate } from './navBarActions';

const usersUrl = 'customers';

export const CREATE_USER_PENDING = 'CREATE_USER_PENDING';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export const createUserPending = isLoading => ({
	type: CREATE_USER_PENDING,
	isLoading,
});

export const createUserSuccess = user => ({
	type: CREATE_USER_SUCCESS,
	user,
});

export const createUserFailure = error => ({
	type: CREATE_USER_FAILURE,
	error,
});

export const createUser = user => dispatch => {
	dispatch(createUserPending(true));
	return createResource(usersUrl, user)
		.then(response => {
			dispatch(createUserPending(false));
			dispatch(createUserSuccess(response.data));
			localStorage.setItem('auth_token', response.data.customer.access_token);
			dispatch(authenticate(true));
		})
		.catch(err => {
			dispatch(createUserPending(false));
			dispatch(createUserFailure(err.response.data));
		});
};
