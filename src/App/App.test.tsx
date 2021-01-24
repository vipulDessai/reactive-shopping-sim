import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { App } from '@/App';

import { store } from '@/_helpers';

describe('render', () => {
  test('renders landing page', () => {
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
});