import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/_reducers';
import { CartActionType, Product, ProductsActions, ProductUpdateType } from '@/_types';

export function Cart() {
    const cartItems = useSelector((state: RootState) => state.cart.products);
    const dispatch = useDispatch();

    const removeFromCart = (product: Product) => {
        dispatch({type: CartActionType.DELETE, product: {...product}})

        const updatingProduct = { ...product };
        dispatch({ type: ProductsActions.UPDATE_QTY, updatingProduct, productUpdateType: ProductUpdateType.DEC });
    }
    return (
        <>
        {
            cartItems && cartItems.map(
                (product: Product, index) => {
                    const title: any = {
                        "Name": product.name,
                        "Price": `${product.price} x ${product.cartQuantity} = ${parseFloat(product.price) * product.cartQuantity} ₹`,
                    }
                    return (
                        <ul key={index}>
                            <li><img src={product.image} alt={`${product.image} # ${product.name}`} /></li>
                            {
                                Object.keys(title).map(key => <ul><li>{key}</li><li>{title[key]}</li></ul>)
                            }
                            <li>
                                <ul>
                                    <li>Quantity</li>
                                    <li>{product.cartQuantity}</li>
                                </ul>
                            </li>
                            <li><button onClick={() => removeFromCart(product)}>Remove</button></li>
                        </ul>
                    )
                }
            )
        }
        </>
    );
}