import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RootState } from '@/_reducers';
import { Cart } from './Cart';

export function Header() {
    const [showCart, setShowCart] = useState(false);
    const cartItems = useSelector((state: RootState) => state.cart.products);
    return (
        <header>
            <ul className="flex">
                <li>Logo</li>
                <li onClick={() => setShowCart(!showCart)} className={`${showCart ? 'close-cart-padding' : ''} pointer-hand`}>
                    {
                        !showCart && <>Cart <span>{cartItems && cartItems.length || '0'}</span></>
                    }
                    {
                        showCart && <FontAwesomeIcon icon="times-circle" />
                    }
                </li>
            </ul>
            {
                showCart && <Cart />
            }
            
        </header>
    );
}