export enum ProductsActions {
    INIT = 'init',
    ERROR = 'error',
}

export type Product = {
    "id": number,
    "name": string,
    "description": string,
    "price": string,
    "quantity": number,
    "image": string
}

export type Products<T> = [T];

export type ProductsAction = {
    type: string,
    error: string,
    products: Products<Product>
}