import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { App } from '@/App';
import { store } from '@/_helpers';
import { Catalog } from '@/_components';
import { rootReducer } from '@/_reducers';

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
    const initialState: Object = {
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
    const testStore = createStore(rootReducer, initialState);

    render(
      <Provider store={testStore}>
        <Catalog />
      </Provider>
    );

    const productTitle = await screen.findAllByText(/Product 1/i);
    expect(productTitle.length).toBe(1);
  });
});