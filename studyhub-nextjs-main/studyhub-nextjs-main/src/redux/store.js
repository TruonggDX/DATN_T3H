const { configureStore } = require('@reduxjs/toolkit');

import { filterReducer } from './filter/reducers';
import { productReducer } from './product/reducers';
import { themeReducer } from './theme/reducers';
import { userReducer } from './user/reducers';

export const store = configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
        product: productReducer,
        filter: filterReducer,
    },
})
