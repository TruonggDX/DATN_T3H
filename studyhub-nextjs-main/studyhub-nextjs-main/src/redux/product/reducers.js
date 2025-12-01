const initialState = {
	addedProducts: [
		{
			id: 1,
			quantity: 1,
		},
		{
			id: 2,
			quantity: 1,
		},
		{
			id: 3,
			quantity: 1,
		},
	],
};
  
const productReducer = (state = initialState, action) => {
	const { type, id, quantity } = action;
  
	switch (type) {
	  	case 'ADD_PRODUCT':
			// Check if the ID already exists in addedProducts
			const exists = state.addedProducts.some((product) => product.id === id);
	
			if (!exists) {
				return {
					...state,
					addedProducts: [
						...state.addedProducts,
						{ id: id, quantity: 1 }, // Adding a new product with quantity 1
					],
				};
			} else {
				console.log('Product already added');
				return state;
			};
	  	case 'REMOVE_PRODUCT':
			return {
				...state,
				addedProducts: state.addedProducts.filter((product) => product.id !== id),
			};
		case 'UPDATE_QUANTITY':
			// Check if the ID already exists in addedProducts
			const productIndex = state.addedProducts.findIndex((product) => product.id === id);
		
			if (productIndex !== -1) {
				// If the product exists, update its quantity
				const updatedProducts = [...state.addedProducts];
				updatedProducts[productIndex] = {
					...updatedProducts[productIndex],
					quantity: quantity,
				};
		
				return {
					...state,
					addedProducts: updatedProducts,
				};
			} else {
				return state;
			}
	  	case 'PRODUCT_ERR':
			console.log('PRODUCT_ERR: ', state);
			return {
				...state,
			};
	  	default:
			return state;
	}
};
  
export { productReducer };
  