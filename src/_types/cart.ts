import { Product } from "./product";

export enum CartActionType {
    ADD = "add",
    DELETE = "delete",
}

export type CartAction = {
    type: string;
    product: Product;
}