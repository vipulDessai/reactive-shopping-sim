import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RootState } from '@/_reducers';
import { CartActionType, Product, ProductsActions, ProductUpdateType } from '@/_types';

export function Cart() {
    const cartItems = useSelector((state: RootState) => state.cart.products);
    const dispatch = useDispatch();

    const removeFromCart = (product: Product) => {
        dispatch({ type: CartActionType.DELETE, product: { ...product } })

        const updatingProduct = { ...product };
        dispatch({ type: ProductsActions.UPDATE_QTY, updatingProduct, productUpdateType: ProductUpdateType.DEC });
    }

    return (
        <section className="cart">
            {
                (!cartItems || cartItems && cartItems.length == 0) && <p className="align-center">Cart is empty</p>
            }
            {
                cartItems && cartItems.map(
                    (product: Product, index) => {
                        return (
                            <ul className="cart-item flex" key={index}>
                                <li><img src={product.image} alt={`${product.id} # ${product.name}`} /></li>
                                <li>
                                    <ul>
                                        <li>{product.name}</li>
                                        <li>
                                            <ul className="flex">
                                                <li>Price:&nbsp;</li>
                                                <li>{`${product.price} x ${product.cartQuantity} = ${parseFloat(product.price) * product.cartQuantity} ₹`}</li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul className="flex">
                                                <li>QTY:&nbsp;</li>
                                                <li>{product.cartQuantity}</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li><button className="pointer-hand" title={`Remove ${product.id}`} onClick={() => removeFromCart(product)}><FontAwesomeIcon icon="trash" /></button></li>
                            </ul>
                        )
                    }
                )
            }
        </section>
    );
}