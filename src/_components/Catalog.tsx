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
        <section className="catalog flex">
            {
                error && <p className="align-center w-100">Error: {error}</p>
            }
            {
                products && products.map(
                    (product: ProductType, index) => 
                        {
                            const title: any = {
                                "Description": product.description,
                                "Price": `${product.price} ₹`,
                            }

                            const updatedQuantity = typeof product.quantity === 'string' ? parseInt(product.quantity) - product.cartQuantity : product.quantity - product.cartQuantity;

                            return (
                                <ul className="tile" key={index}>
                                    <li><img src={product.image} alt={`${product.image} # ${product.name}`} /></li>
                                    <li><ul><li><b>{product.name}</b></li></ul></li>
                                    {
                                        Object.keys(title).map((key, index) => <li key={index}><ul><li><b>{key}</b></li><li>{title[key]}</li></ul></li>)
                                    }
                                    <li>
                                        <ul>
                                            <li><b>Remaining QTY: </b></li>
                                            <li>{`${updatedQuantity} / ${product.quantity}`}</li>
                                        </ul>
                                    </li>
                                    {
                                        product.cartQuantity < product.quantity && <li><button className="pointer-hand" onClick={() => addToCart(product)}>Add to cart</button></li>
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