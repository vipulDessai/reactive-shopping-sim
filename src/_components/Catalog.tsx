import { RootState } from '@/_reducers';
import React from 'react';
import { useSelector } from 'react-redux';

import { Product } from './Product';
import { Product as ProductType } from '@/_types';


export function Catalog() {
    const error = useSelector((state:RootState) => state.catalog.error);
    const products = useSelector((state:RootState) => state.catalog.products);

    return (
        <ul>
            {
                error && <p>Error: {error}</p>
            }
            {
                products && products.map((product: ProductType, index) => <Product key={index} product={product} />)
            }
        </ul> 
    );
}