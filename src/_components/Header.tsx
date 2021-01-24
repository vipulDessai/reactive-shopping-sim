import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import cartIcon from '@/_images/cart-icon.png';

import { RootState } from '@/_reducers';
import { Cart } from './Cart';

export function Header() {
    const [showCart, setShowCart] = useState(false);
    const cartItems = useSelector((state: RootState) => state.cart.products);
    return (
        <header>
            <ul className="flex">
                <li><h4 className="m-0">Reactive Shop</h4></li>
                <li onClick={() => setShowCart(!showCart)} className={`${showCart ? 'close-cart-padding' : ''} pointer-hand`}>
                    {
                        !showCart && <><img className="cart-icon" src={cartIcon} alt="cart" /> <span className="cart-count">{cartItems && cartItems.length || '0'}</span></>
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