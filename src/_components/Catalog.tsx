import { RootState } from '@/_reducers';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CartActionType, Product as ProductType, ProductsActions, ProductUpdateType } from '@/_types';

export function Catalog() {
    const { error, products } = useSelector((state: RootState) => state.catalog);
    
    const dispatch = useDispatch();

    const addToCart = (product: ProductType) => {
        dispatch({ type: CartActionType.ADD, product: { ...product } });

        const updatingProduct = { ...product };
        dispatch({ type: ProductsActions.UPDATE_QTY, updatingProduct, productUpdateType: ProductUpdateType.INC });
    }

    return (
        <section>
            {
                error && <p>Error: {error}</p>
            }
            {
                products && products.map(
                    (product: ProductType, index) => 
                        {
                            const title: any = {
                                "Name": product.name,
                                "Description": product.description,
                                "Price": `${product.price} ₹`,
                            }

                            const updatedQuantity = typeof product.quantity === 'string' ? parseInt(product.quantity) - product.cartQuantity : product.quantity - product.cartQuantity;

                            return (
                                <ul key={index}>
                                    <li><img src={product.image} alt={`${product.image} # ${product.name}`} /></li>
                                    {
                                        Object.keys(title).map((key, index) => <li key={index}><ul><li>{key}</li><li>{title[key]}</li></ul></li>)
                                    }
                                    <li>
                                        <ul>
                                            <li>Remaining QTY: </li>
                                            <li>{`${updatedQuantity} / ${product.quantity}`}</li>
                                        </ul>
                                    </li>
                                    {
                                        product.cartQuantity < product.quantity && <li><button onClick={() => addToCart(product)}>Add to cart</button></li>
                                    }
                                    {
                                        product.cartQuantity === product.quantity && <li><button disabled>Add to cart</button></li>
                                    }
                                </ul>
                            )
                        }
                )
            }
        </section> 
    );
}