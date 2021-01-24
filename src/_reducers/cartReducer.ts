import { CartAction, CartActionType, Product, Products } from "@/_types";

const cartInitialState: {products: Products<Product> | []} = {
    products: []
}

export function cart(state = cartInitialState, action: CartAction) {
    switch (action.type) {
        case CartActionType.ADD:
            return state;

        case CartActionType.DELETE:
            return state;
    
        default:
            return state;
    }
}