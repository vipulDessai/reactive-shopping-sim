export enum ProductsActions {
    INIT = 'init',
    ERROR = 'error',
    UPDATE_QTY = 'update product',
}

export enum ProductUpdateType {
    INC = 'inc',
    DEC = 'dec',
}

export type Product = {
    "id": number;
    "name": string;
    "description": string;
    "price": string;
    "quantity": number | string;
    "cartQuantity": number,
    "image": string;
}

export type Products<T> = T[];

export type ProductsAction = {
    type: string;
    error: string;
    products: Products<Product>;
    updatingProduct: Product,
    productUpdateType: ProductUpdateType,
}