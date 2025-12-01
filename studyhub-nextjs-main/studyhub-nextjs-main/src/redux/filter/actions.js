const actions = {

	setFilter( data ) {
		return {
			type: 'SET_FILTER',
			data,
		};
	},

	filterErr: (err) => {
		return {
			type: 'FILTER_ERR',
			err,
		};
	},
};

export default actions;
