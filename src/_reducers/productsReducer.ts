import { Product, Products, ProductsAction, ProductsActions, ProductUpdateType } from "@/_types";

const initialCatalogState: { products: Products<Product> | null, error: string | null } = {
    products: null,
    error: null,
}

export function catalog(state = initialCatalogState, action: ProductsAction) {
    switch (action.type) {
        case ProductsActions.INIT: 
            return {
                ...state,
                error: null,
                products: action.products.map(
                        product => { 
                            return {
                                ...product, 
                                quantity: typeof product.quantity === 'string' ? parseInt(product.quantity) : product.quantity,
                                cartQuantity: 0
                            }; 
                        }
                    ),
            };

        case ProductsActions.UPDATE_QTY:
            const updatedProduct = action.updatingProduct;
            const products = [...state.products];

            for (let index = 0; index < products.length; index++) {
                const product = products[index];
                if(product.id === updatedProduct.id) {
                    switch (action.productUpdateType) {
                        case ProductUpdateType.INC:
                            ++product.cartQuantity;
                            break;

                        case ProductUpdateType.DEC:
                            --product.cartQuantity;
                            break;
                    
                        default:
                            break;
                    }
                    
                    break;
                }
            }

            return {
                ...state,
                error: null,
                products: products,
            };

        case ProductsActions.ERROR:
            return {
                ...state,
                error: action.error,
                products: null
            };
    
        default:
            return state;
    }
}