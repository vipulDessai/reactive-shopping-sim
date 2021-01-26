import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { App } from '@/App';
import { store } from '@/_helpers';
import { Catalog, Header } from '@/_components';
import { rootReducer } from '@/_reducers';
import { Product, Products } from '@/_types';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
library.add( faTrash, faTimesCircle );

describe('Render', () => {
  test('loading static text', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  
    expect(
      screen.getByRole('heading', {
        name: /reactive shop/i
      })
    ).toHaveTextContent('Reactive Shop');
  });

  test('loading product tile', async () => {
    const catalogInitialState: {catalog: { products: Products<Product>, error: string | null }} = {
      catalog: {
        products: [
          {
            "id": 1,
            "name": "Product 1",
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type ",
            "price": "100.00",
            "quantity": 10,
            "cartQuantity": 10,
            "image": "http://truth-events.com/wp-content/uploads/2019/09/dummy.jpg"
          },
        ],
        error: null
      }
    }
    const mockStore = createStore(rootReducer, catalogInitialState);

    render(
      <Provider store={mockStore}>
        <Catalog />
      </Provider>
    );

    const productTitle = await screen.findAllByText(/Product 1/i);
    expect(productTitle.length).toBe(1);
  });

  test('Cart is loading and unloading', async () => {
    const cartInitialState: any = {
      cart: {
        products: [
          {
            "id": 1,
            "name": "Product 1",
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type ",
            "price": "100.00",
            "quantity": 10,
            "cartQuantity": 3,
            "image": "http://truth-events.com/wp-content/uploads/2019/09/dummy.jpg"
          },
        ],
      },
      catalog: {
        products: [],
        error: null
      }
    };

    const mockStore = createStore(rootReducer, cartInitialState);

    render(
      <Provider store={mockStore}>
        <Header></Header>
      </Provider>
    );

    userEvent.click(screen.getByAltText(/cart/i));

    const product = cartInitialState.cart.products[0];
    expect(screen.getByText(product.name, {exact: false})).toHaveTextContent(product.name);
    // expect(screen.getByText('Price:', {exact: false})).toHaveTextContent('Price:');
    expect(screen.getByText('QTY:', {exact: false})).toHaveTextContent('QTY:');

    // since the quantity is 3, loop twice and remove 2 items 
    // it should keep 1 item in the cart
    for (let index = 0; index < 2; index++) {
      userEvent.click(
        screen.getByRole('button', {
          name: /remove 1/i
        })
      );
    }

    // cart empty message should NOT be there
    expect(screen.queryByText(/Cart is empty/i)).not.toBeInTheDocument();
    
    // now the cart quantity is 1, click and remove it
    userEvent.click(
      screen.getByRole('button', {
        name: /remove 1/i
      })
    );

    await screen.findByText(/Cart is empty/i);
  })
});

describe('Fucntionality', () => {
  test('Add to cart', () => {

  });

  test('Remove from cart', () => {

  });
});

describe('Network Requests', () => {
  test('get all data i.e. 8 items',  async () => {
      render(
        <Provider store={store}>
          <App />
        </Provider>
      );

      // wait for receiving the product list
      expect.assertions(1);
      
      const productTile = await screen.findAllByText(/Product /i);
      expect(productTile.length).toBe(7);
  });
});