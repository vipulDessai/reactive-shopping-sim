import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/_reducers';
import { Cart } from './Cart';

export function Header() {
    const [showCart, setShowCart] = useState(false);
    const cartItems = useSelector((state: RootState) => state.cart.products);
    return (
        <header>
            <ul className="flex">
                <li>Logo</li>
                <li onClick={() => setShowCart(!showCart)}>Cart <span>{cartItems && cartItems.length}</span></li>
            </ul>
            {
                showCart && <Cart />
            }
            
        </header>
    );
}