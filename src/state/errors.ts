import {APIError} from './types';
import objMethods from '../utils/object';
import {type} from 'os';

export const InternalError = {
	message: 'Internal error during request.',
	code: -500
};

const getExceptionPayload = (ex: any): APIError => {
	if (typeof ex !== 'object' || !ex) {
		return InternalError;
	}

	const typedException = ex as APIError;
	if (objMethods.hasProperty(ex, 'message') && objMethods.hasProperty(ex, 'code')) {
		return {
			message: typedException.message,
			code: typedException.code
		};
	} else if (objMethods.hasProperty(ex, 'errors')) {
		return {
			message: ex.errors,
			code: 400
		} as APIError;
	}

	return InternalError;
};

export default getExceptionPayload;
