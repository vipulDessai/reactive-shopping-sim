
import React from 'react';
import { useDispatch } from 'react-redux';

import { CartActionType, Product } from '@/_types';

export function Product({product}: {product: Product}) {
    const dispatch = useDispatch();
    return (
        <ul>
            <li><img src={product.image} alt={`${product.image} # ${product.name}`} /></li>
            <li>{product.description}</li>
            <li>{product.price}</li>
            <li>{product.quantity}</li>
            <li><button onClick={() => dispatch({action: CartActionType.ADD, id: product.id})}>Add to cart</button></li>
        </ul>
    );
}