import React from 'react';
import { Cart } from './Cart';

export function Header() {
    return (
        <header>
            <ul>
                <li>Logo</li>
                <li><Cart /></li>
            </ul>
        </header>
    );
}