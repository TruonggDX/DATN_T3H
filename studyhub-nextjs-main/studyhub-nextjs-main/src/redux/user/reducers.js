const initialState = {
	admin: null, 
};

const userReducer = (state = initialState, action) => {
	const { type, user } = action;

	switch (type) {
		case 'SET_USER':
			if (typeof window !== 'undefined') {
				localStorage.setItem('user', JSON.stringify(user));
			}
			return {
				...state,
				admin: user,
			};
		case 'UPDATE_USER':
			const updateUser = state.admin && state.admin.username === user.username ? user : state.admin;
			if (typeof window !== 'undefined') {
				localStorage.setItem('user', JSON.stringify(updateUser));
			}
			return {
				...state,
				admin: updateUser,
			};
		case 'CLEAR_USER':
			if (typeof window !== 'undefined') {
				localStorage.removeItem('user');
			}
			return {
				...state,
				admin: null,
			};
		default:
			return state;
	}
};

export { userReducer };
