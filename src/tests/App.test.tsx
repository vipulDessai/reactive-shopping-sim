import React from 'react';
import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

import { App } from '@/App';
import { Catalog, Header } from '@/_components';
import { store as originalStore } from '@/_helpers';
import { CartActionType, Product, Products } from '@/_types';
import { rootReducer } from '@/_reducers';

// svg icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
library.add( faTrash, faTimesCircle );

const mockStore = configureMockStore([thunk]);

describe('Render', () => {
  test('loads header content', () => {
    const appInitialState: {
      catalog: { 
        products: Products<Product>, 
        error: string | null 
      }, 
      cart: {
        products: []
      }
    } = {
      catalog: {
        products: [],
        error: null
      },
      cart: {
        products: []
      }
    }
    const store = mockStore(appInitialState);
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

  test('loads product tile', async () => {
    const catalogInitialState: {
      catalog: { 
        products: Products<Product>, 
        error: string | null 
      }
    } = {
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
          }
        ],
        error: null
      }
    }
    const store = mockStore(catalogInitialState);

    render(
      <Provider store={store}>
        <Catalog />
      </Provider>
    );

    const productTitle = await screen.findAllByText(/Product 1/i);
    expect(productTitle.length).toBe(1);
  });

  test('loads and unloads cart', async () => {
    let cartInitialState = {
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
    };

    const store = mockStore(() => cartInitialState);

    render(
      <Provider store={store}>
        <Header></Header>
      </Provider>
    );

    userEvent.click(screen.getByAltText(/cart/i));

    const product = cartInitialState.cart.products[0];
    expect(screen.getByText(product.name, {exact: false})).toHaveTextContent(product.name);
    expect(screen.getByText('Price:', {exact: false})).toHaveTextContent('Price:');
    expect(screen.getByText('QTY:', {exact: false})).toHaveTextContent('QTY:');

    // reduce the quantity from 3 to 1
    cartInitialState.cart.products[0].cartQuantity = 1;
    cartInitialState = {
      cart: {
        products: [Object.assign({}, cartInitialState.cart.products[0])]
      }
    }
    store.dispatch({type: CartActionType.DELETE});

    // cart empty message should NOT be there
    expect(screen.queryByText(/Cart is empty/i)).not.toBeInTheDocument();
    
    // now the cart quantity is 1, click and remove it
    cartInitialState = {
      cart: {
        products: null
      }
    }
    store.dispatch({type: CartActionType.DELETE});

    expect(await screen.findByText(/Cart is empty/i)).toBeInTheDocument();
  })
});

describe('Fucntionality', () => {
  test('Add to cart', () => {
    const catalogInitialState: {
      cart: {
        products: Products<Product>
      }, 
      catalog: {
        products: Products<Product>,
        error: null | string,
      }
    } = {
      cart: {
        products: null,
      },
      catalog: {
        products: [
          {
            "id": 1,
            "name": "Product 1",
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type ",
            "price": "100.00",
            "quantity": 3,
            "cartQuantity": 0,
            "image": "http://truth-events.com/wp-content/uploads/2019/09/dummy.jpg"
          },
          {
            "id": 2,
            "name": "Product 2",
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ",
            "price": "130.00",
            "quantity": 2,
            "cartQuantity": 0,
            "image": "http://truth-events.com/wp-content/uploads/2019/09/dummy.jpg"
          },
          {
            "id": 3,
            "name": "Product 3",
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.",
            "price": "250.00",
            "quantity": 1,
            "cartQuantity": 0,
            "image": "http://truth-events.com/wp-content/uploads/2019/09/dummy.jpg"
          },
        ],
        error: null
      }
    };
    const mockStore = createStore(
      rootReducer,
      catalogInitialState,
      applyMiddleware(thunk)
    );

    render(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );

    userEvent.click(screen.getByAltText(/cart/i));

    const catalogProducts = catalogInitialState.catalog.products;

    // click on all the button till they get disabled
    for (let i = 0; i < catalogProducts.length; i++) {
      const product = catalogProducts[i];
      const catalogAddToCartButton = screen.getByRole('button', {
        name: `Add ${product.id}`, exact: false
      });
      for (let j = 0; j < product.quantity; j++) {
        userEvent.click(catalogAddToCartButton);
      }
    }

    // check if they are disabled and
    for (let i = 0; i < catalogProducts.length; i++) {
      const product = catalogProducts[i];
      const catalogAddToCartButton = screen.getByRole('button', {
        name: `Add ${product.id}`, exact: false
      });

      expect(catalogAddToCartButton).toHaveAttribute('disabled');

      const productDescription = within(screen.queryByRole('banner')).getByText(product.name).closest('ul');
      const quantityElement = within(productDescription).getByText('QTY:').closest('ul');
      expect(within(quantityElement).getByText(product.quantity)).toHaveTextContent(JSON.stringify(product.quantity));
    
      const productTile = within(
        screen.getByRole('region', {
          name: /catalog/i
        })
      ).getByTestId(`product-tile-${product.id}`);

      const remainingQuantityElement = within(productTile).getByText('Remaining QTY:').closest('ul');
      expect(within(remainingQuantityElement).getByText(`0 / ${product.quantity}`, {exact: false})).toHaveTextContent(`0 / ${product.quantity}`);
    }
  });

  test('Remove from cart', () => {
    const catalogInitialState: {
      cart: {
        products: Products<Product>
      }, 
      catalog: {
        products: Products<Product>,
        error: null | string,
      }
    } = {
      cart: {
        products: [
          {
            "id": 1,
            "name": "Product 1",
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type ",
            "price": "100.00",
            "quantity": 3,
            "cartQuantity": 3,
            "image": "http://truth-events.com/wp-content/uploads/2019/09/dummy.jpg"
          },
          {
            "id": 2,
            "name": "Product 2",
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ",
            "price": "130.00",
            "quantity": 2,
            "cartQuantity": 2,
            "image": "http://truth-events.com/wp-content/uploads/2019/09/dummy.jpg"
          }
        ]
      },
      catalog: {
        products: [
          {
            "id": 1,
            "name": "Product 1",
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type ",
            "price": "100.00",
            "quantity": 3,
            "cartQuantity": 3,
            "image": "http://truth-events.com/wp-content/uploads/2019/09/dummy.jpg"
          },
          {
            "id": 2,
            "name": "Product 2",
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ",
            "price": "130.00",
            "quantity": 2,
            "cartQuantity": 2,
            "image": "http://truth-events.com/wp-content/uploads/2019/09/dummy.jpg"
          }
        ],
        error: null
      }
    };
    const mockStore = createStore(
      rootReducer,
      catalogInitialState,
      applyMiddleware(thunk)
    );

    render(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );

    userEvent.click(screen.getByAltText(/cart/i));

    const cartProducts = catalogInitialState.cart.products;

    // click on all the button till we can cart empty message
    for (let i = 0; i < cartProducts.length; i++) {
      const product = cartProducts[i];
      const cartRemoveButton = screen.getByRole('button', {
        name: `Remove ${product.id}`, exact: false
      });
      for (let j = 0; j < product.quantity; j++) {
        userEvent.click(cartRemoveButton);
      }
    }

    // view the cart empty message
    expect(screen.getByText(/Cart is empty/i)).toBeInTheDocument();

    const catalogProducts = catalogInitialState.catalog.products;
    // check if they are disabled and
    for (let i = 0; i < catalogProducts.length; i++) {
      const product = catalogProducts[i];
      const catalogAddToCartButton = screen.getByRole('button', {
        name: `Add ${product.id}`, exact: false
      });

      expect(catalogAddToCartButton).not.toHaveAttribute('disabled');
    
      const productTile = within(
        screen.getByRole('region', {
          name: /catalog/i
        })
      ).getByTestId(`product-tile-${product.id}`);

      const remainingQuantityElement = within(productTile).getByText('Remaining QTY:').closest('ul');
      expect(within(remainingQuantityElement).getByText(`${product.quantity} / ${product.quantity}`, {exact: false})).toHaveTextContent(`${product.quantity} / ${product.quantity}`);
    }
  });
});

describe('Network Requests', () => {
  test('get all data i.e. 8 items',  async () => {
      render(
        <Provider store={originalStore}>
          <App />
        </Provider>
      );
      
      const productTile = await screen.findAllByText(/Product /i);
      expect(productTile.length).toBe(7);
  });
});