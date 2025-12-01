import actions from './actions';

const { setUser, updateUser, clearUser, userErr } = actions;

const setUserData = (user) => {
	return async (dispatch) => {
		try {
			dispatch(setUser(user));
		} catch (err) {
			// dispatch(userErr(err));
		}
	};
};

const updateUserData = (user) => {
	return async (dispatch) => {
		try {
			dispatch(updateUser(user));
		} catch (err) {
			// dispatch(userErr(err));
		}
	};
};

const clearUserData = () => {
	return async (dispatch) => {
		try {
			dispatch(clearUser());
		} catch (err) {
			// dispatch(userErr(err));
		}
	};
};

export { setUserData, updateUserData, clearUserData };
