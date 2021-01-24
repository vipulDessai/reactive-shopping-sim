import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { store } from '@/_helpers';
import { App } from '@/App';

library.add( faTrash, faTimesCircle );

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

module.hot.accept();