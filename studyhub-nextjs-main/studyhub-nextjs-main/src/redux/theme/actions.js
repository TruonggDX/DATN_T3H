const actions = {

	setMode( mode ) {
		return {
			type: 'SET_MODE',
			mode,
		};
	},

	setLanguage( language ) {
		return {
			type: 'SET_LANGUAGE',
			language,
		};
	},

	setCurrency( currency ) {
		return {
			type: 'SET_CURRENCY',
			currency,
		};
	},
};

export default actions;
