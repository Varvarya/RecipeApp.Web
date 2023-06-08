const hasProperty = (obj: object, prop: string) => {
	return Object.prototype.hasOwnProperty.call(obj, prop);
};

const empty = (object: object) => {
	Object.keys(object).forEach(function (k) {
		if (object[k] && typeof object[k] === 'object') {
			return empty(object[k]);
		}
		object[k] = '';
	});
	return object;
};

const objMethods = {
	hasProperty: hasProperty,
	empty: empty
};

export {hasProperty, empty};
export default objMethods;
