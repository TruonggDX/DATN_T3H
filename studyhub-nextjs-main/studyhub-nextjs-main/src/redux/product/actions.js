const actions = {

	addProduct( id ) {
		return {
			type: 'ADD_PRODUCT',
			id,
		};
	},

	removeProduct( id ) {
		return {
			type: 'REMOVE_PRODUCT',
			id,
		};
	},

	updateQuantity( id, quantity ) {
		return {
			type: 'UPDATE_QUANTITY',
			id,
			quantity,
		};
	},


	productErr: (err) => {
		return {
			type: 'PRODUCT_ERR',
			err,
		};
	},
};

export default actions;
