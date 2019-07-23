import { updateResource, getResource } from '../../utils/http';

const addressUrl = 'customers/address';
const shippingUrl = 'shipping';

export const UPDATE_CUSTOMER_ADDRESS_PENDING = 'UPDATE_CUSTOMER_ADDRESS_PENDING';
export const UPDATE_CUSTOMER_ADDRESS_SUCCESS = 'UPDATE_CUSTOMER_ADDRESS_SUCCESS';
export const UPDATE_CUSTOMER_ADDRESS_FAILURE = 'UPDATE_CUSTOMER_ADDRESS_FAILURE';
export const GET_SHIPPING_OPTION = 'GET_SHIPPING_OPTION';

export const FETCH_SHIPPING_PENDING = 'FETCH_SHIPPING_PENDING';
export const FETCH_SHIPPING_SUCCESS = 'FETCH_SHIPPING_SUCCESS';
export const FETCH_SHIPPING_FAILURE = 'FETCH_SHIPPING_FAILURE';

export const fetchShippingPending = isLoading => ({
	type: FETCH_SHIPPING_PENDING,
	isLoading,
});

export const fetchShippingSuccess = shipping => ({
	type: FETCH_SHIPPING_SUCCESS,
	shipping,
});

export const fetchShippingFailure = error => ({
	type: FETCH_SHIPPING_FAILURE,
	error,
});

export const updateCustomerAddressPending = isLoading => ({
	type: UPDATE_CUSTOMER_ADDRESS_PENDING,
	isLoading,
});

export const updateCustomerAddressSuccess = customer => ({
	type: UPDATE_CUSTOMER_ADDRESS_SUCCESS,
	customer,
});

export const updateCustomerAddressFailure = error => ({
	type: UPDATE_CUSTOMER_ADDRESS_FAILURE,
	error,
});

export const getShippingOption = shippingOption => ({
	type: GET_SHIPPING_OPTION,
	shippingOption,
});

export const updateCustomer = customerInfo => dispatch => {
	dispatch(updateCustomerAddressPending(true));
	return updateResource(addressUrl, customerInfo)
		.then(response => {
			dispatch(updateCustomerAddressSuccess(response.data));
			dispatch(updateCustomerAddressPending(false));
		})
		.catch(err => {
			dispatch(updateCustomerAddressFailure(err.response));
			dispatch(updateCustomerAddressPending(false));
		});
};

export const fetchShippingOption = shippingOption => dispatch => {
	dispatch(getShippingOption(shippingOption));
};

export const fetchShipping = shipping_id => dispatch => {
	dispatch(fetchShippingPending(true));
	return getResource(`${shippingUrl}/${shipping_id}`)
		.then(response => {
			dispatch(fetchShippingPending(false));
			dispatch(fetchShippingSuccess(response.data));
		})
		.catch(error => {
			dispatch(fetchShippingPending(false));
			dispatch(fetchShippingFailure(error.response));
		});
};
