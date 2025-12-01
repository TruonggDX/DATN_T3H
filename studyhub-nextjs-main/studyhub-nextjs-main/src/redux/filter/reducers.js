const initialState = { };

const filterReducer = (state = initialState, action) => {
	const { type, data } = action;
  
	switch (type) {
	  	case 'SET_FILTER':
		  	return {
				...state,
				data,
			};
	  	case 'FILTER_ERR':
			return {
				...state,
			};
	  	default:
			return state;
	}
};
  
export { filterReducer };
  