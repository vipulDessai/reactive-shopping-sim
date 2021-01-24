import { combineReducers } from 'redux';

import { catalog } from './productsReducer';
import { cart } from './cartReducer';

export const rootReducer = combineReducers({
    catalog,
    cart
});

export type RootState = ReturnType<typeof rootReducer>;