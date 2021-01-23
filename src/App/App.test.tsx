import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { App } from '@/App';

import { store } from '@/_helpers';

test('renders login page', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText(/app/i)).toHaveTextContent('App');
});