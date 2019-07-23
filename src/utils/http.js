import axios from 'axios';

export const baseUrl = `https://shop-tshirt.herokuapp.com/`;

const putPostConfig = (method, body = null) => {
	const upperCasedMethod = method.toUpperCase();
	const token = localStorage.getItem('auth_token');
	const config = {
		method: upperCasedMethod,
		headers: {
			Accept: 'application/json',
			USER_KEY: token,
		},
	};

	if (['POST', 'PATCH'].includes(upperCasedMethod)) {
		config.data = body;
	}
	return config;
};

const getConfig = method => {
	const upperCasedMethod = method.toUpperCase();
	const config = {
		method: upperCasedMethod,
		headers: {
			'Content-type': 'application/json',
		},
		mode: 'no-cors',
		cache: 'no-cache',
	};
	return config;
};

export const getResource = url => axios(`${baseUrl}${url}`, getConfig('GET'));

export const getSingleResource = url => axios(`${baseUrl}${url}`, getConfig('GET'));

export const createResource = (url, resourceData) => axios(`${baseUrl}${url}`, putPostConfig('POST', resourceData));

export const removeResource = url => axios(`${baseUrl}${url}`, putPostConfig('DELETE'));

export const updateResource = (url, resourceToEdit) =>
	axios(`${baseUrl}${url}`, putPostConfig('PATCH', resourceToEdit));
