import actions from './actions';

const { setFilter, filterErr } = actions;

const setFilterData = (data) => {
	return async (dispatch) => {
		try {
			dispatch(setFilter(data));
		} catch (err) {
			// dispatch(filterErr(err));
		}
	};
};

export { setFilterData };
