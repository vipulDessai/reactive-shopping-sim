import { Product, Products, ProductsAction, ProductsActions } from "@/_types";

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
                products: action.products,
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