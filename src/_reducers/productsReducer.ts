export enum ProductsActions {
    GET_ALL = 'get_all',
    ERROR = 'error',
}

type Product = {
    "id": number,
    "name": string,
    "description": string,
    "price": string,
    "quantity": string,
    "image": string
}

type Products<T> = [T] | [];

type ProductsAction = {
    type: string,
    error: Object,
    products: Products<Product>
}

export function products(state: { Products: Products<Product> } | {} = {}, action: ProductsAction) {
    switch (action.type) {
        case ProductsActions.GET_ALL:
            return {
                ...state,
                products: action.products,
            };

        case ProductsActions.ERROR:
            return {
                ...state,
                error: action.error,
            };
    
        default:
            return state;
    }
}