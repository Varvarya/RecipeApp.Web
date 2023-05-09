const uploadFile = (path?: string) => {
	const reader = new FileReader();
	if (path) reader.onloadend = function() {
		console.log('Encoded Base 64 File String:', reader.result);

		const data=(path).split(',')[1];
		const binaryBlob = atob(data);
		return binaryBlob;
	};
};

export default uploadFile;
