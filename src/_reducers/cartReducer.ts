export enum CartActionType {
    ADD = "add",
    UPDATE = "update",
    DELETE = "delete",
}

type CartAction = {
    type: string;

}

type CartState = {

}

export function cart(state = {}, action: CartAction) {
    switch (action.type) {
        case CartActionType.ADD:
            return state;
            
        case CartActionType.UPDATE:
            return state;

        case CartActionType.DELETE:
            return state;
    
        default:
            return state;
    }
}