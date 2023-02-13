const hasProperty = (obj: object, prop: string) => {
	return Object.prototype.hasOwnProperty.call(obj, prop);
};

export default { hasProperty };
