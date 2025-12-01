import actions from './actions';

const { addProduct, removeProduct, updateQuantity, productErr } = actions;

const productAddData = (id) => {
	return async (dispatch) => {
		try {
			dispatch(addProduct(id));
		} catch (err) {
			// dispatch(productErr(err));
		}
	};
};

const productRemoveData = (id) => {
	return async (dispatch) => {
		try {
			dispatch(removeProduct(id));
		} catch (err) {
			// dispatch(productErr(err));
		}
	};
};

const updateProductQuantity = (id, quantity) => {
	return async (dispatch) => {
		try {
			dispatch(updateQuantity(id, quantity));
		} catch (err) {
			// dispatch(productErr(err));
		}
	};
};

export { productAddData, productRemoveData, updateProductQuantity };
