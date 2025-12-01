const initialState = {
	themeData: {
	  mode: 'light',
	  language: 'english',
	  currency: 'usd',
	},
  };
	
  const themeReducer = (state = initialState, action) => {
	const { type, mode, language, currency } = action;
	
	switch (type) {
	  case 'SET_MODE':
		return {
		  ...state,
		  themeData: {
			...state.themeData, // Keep all existing state
			mode: mode, // Update the mode
		  },
		};
	  case 'SET_LANGUAGE':
		return {
		  ...state,
		  themeData: {
			...state.themeData,
			language: language, // Update the language
		  },
		};
	  case 'SET_CURRENCY':
		return {
		  ...state,
		  themeData: {
			...state.themeData,
			currency: currency, // Update the currency
		  },
		};
	  default:
		return state;
	}
  };
	
  export { themeReducer };
  