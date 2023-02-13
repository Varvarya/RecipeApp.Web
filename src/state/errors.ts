import {APIError} from './types';
import objMethods from '../utils/object';

const InternalError = {
	message: 'Internal error during request.',
	code: -500
};

const getExceptionPayload = (ex: unknown): APIError => {
	if (typeof ex !== 'object' || !ex) {
		return InternalError;
	}

	const typedException = ex as APIError;
	if (objMethods.hasProperty(ex, 'message') && objMethods.hasProperty(ex, 'code')) {
		return {
			message: typedException.message,
			code: typedException.code
		};
	}

	return InternalError;
};

export default getExceptionPayload;
