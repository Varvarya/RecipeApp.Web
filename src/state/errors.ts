import {APIError} from './types';

export const InternalError = {
	errors: ['Internal error during request.'],
	code: -500
};

const getExceptionPayload = (res: any): APIError => {
	console.log(res);

	if (res.data.errors) {
		return {
			errors: res.data.errors,
			code: res.status,
		};
	}
	if (res.data.loginErrorCode) {
		return {
			errors: res.data.errors,
			code: res.data.loginErrorCode,
		};
	}

	return InternalError;
};

export default getExceptionPayload;
