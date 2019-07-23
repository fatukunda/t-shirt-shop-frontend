import { createResource } from '../../utils/http';

const ordersUrl = 'orders';
const chargeUrl = 'stripe/charge';

export const CREATE_ORDER_PENDING = 'CREATE_ORDER_PENDING';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

export const CHARGE_PENDING = 'CHARGE_PENDING';
export const CHARGE_SUCCESS = 'CHARGE_SUCCESS';
export const CHARGE_FAILURE = 'CHARGE_FAILURE';

export const createOrderPending = isLoading => ({
	type: CREATE_ORDER_PENDING,
	isLoading,
});

export const createOrderSuccess = order_id => ({
	type: CREATE_ORDER_SUCCESS,
	order_id,
});

export const createOrderFailure = error => ({
	type: CREATE_ORDER_FAILURE,
	error,
});

export const chargePending = isLoading => ({
	type: CHARGE_PENDING,
	isLoading,
});
export const chargeSuccess = chargeInfo => ({
	type: CHARGE_SUCCESS,
	chargeInfo,
});
export const chargeFailure = error => ({
	type: CHARGE_FAILURE,
	error,
});

export const createOrder = orderDetails => dispatch => {
	dispatch(createOrderPending(true));
	return createResource(ordersUrl, orderDetails)
		.then(response => {
			dispatch(createOrderSuccess(response.data));
			dispatch(createOrderPending(false));
		})
		.catch(error => {
			dispatch(createOrderFailure(error.response));
			dispatch(createOrderPending(false));
		});
};

export const charge = chargeInfo => dispatch => {
	dispatch(chargePending(true));
	return createResource(chargeUrl, chargeInfo)
		.then(response => {
			dispatch(chargePending(false));
			dispatch(chargeSuccess(response.data));
		})
		.catch(error => {
			dispatch(chargePending(false));
			dispatch(chargeFailure(error.response.data.message));
		});
};
