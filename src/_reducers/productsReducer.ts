enum ProductsActions {
    GET_ALL = 'get_all',
}

type ProductsAction = {
    type: string
}

export function products(state = {}, action: ProductsAction) {
    switch (action.type) {
        case ProductsActions.GET_ALL:
            return state;
    
        default:
            return state;
    }
}