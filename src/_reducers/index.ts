import { combineReducers } from 'redux';

import { products } from './productsReducer';
import { cart } from './cartReducer';

export const rootReducer = combineReducers({
    products,
    cart
});