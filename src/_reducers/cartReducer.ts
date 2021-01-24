import { CartAction, CartActionType, Product, Products } from "@/_types";

const cartInitialState: {products: Products<Product> | null} = {
    products: null,
}

export function cart(state = cartInitialState, action: CartAction) {
    switch (action.type) {
        case CartActionType.ADD: {
            const selectedProduct = action.product;
            const cartProducts = state.products === null ? [] : [...state.products];

            let existingCartProduct = null;
            for (let index = 0; index < cartProducts.length; index++) {
                const cartProduct = cartProducts[index];
                if(cartProduct.id == selectedProduct.id) {
                    existingCartProduct = cartProduct;
                    break;
                }
            }

            if(existingCartProduct) {
                ++existingCartProduct.cartQuantity;
            }
            else {
                selectedProduct.cartQuantity = 1;
                cartProducts.push(selectedProduct);
            }

            return {
                ...state, 
                products: cartProducts,
            };
        }

        case CartActionType.DELETE: {
            const selectedProduct = action.product;
            let cartProducts = [...state.products];

            let existingCartProduct = null;
            for (let index = 0; index < cartProducts.length; index++) {
                const cartProduct = cartProducts[index];
                if(cartProduct.id == selectedProduct.id) {
                    existingCartProduct = cartProduct;
                    break;
                }
            }

            --existingCartProduct.cartQuantity;

            if(existingCartProduct.cartQuantity == 0) {
                const index = cartProducts.indexOf(existingCartProduct);
                cartProducts.splice(index, 1);
            }

            if(cartProducts.length == 0)
                cartProducts = null;

            return {
                products: cartProducts,
            };
        }

        default:
            return state;
    }
}