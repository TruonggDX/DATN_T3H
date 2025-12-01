const actions = {

	setUser( user ) {
		return {
			type: 'SET_USER',
			user,
		};
	},

	updateUser( user ) {
		return {
			type: 'UPDATE_USER',
			user,
		};
	},

	clearUser( ) {
		return {
			type: 'CLEAR_USER',
		};
	},

	userErr: (err) => {
		return {
			type: 'USER_ERR',
			err,
		};
	},
};

export default actions;
