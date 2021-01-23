import axios from 'axios';
import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import './App.scss';

import { ProductsActions } from '@/_reducers';

function mapStateToProps(state: any) {
    return { state };
}
  
function mapDispatchToProps(dispatch: any) {
    return { dispatch };
}

const getProducts = () => {
    return (dispatch: any) => {
        axios.get('https://run.mocky.io/v3/aea5d98a-654d-4423-bd99-6fbb90843730')
            .then(
                res => {
                    const responseDataProperty = res.data;
                    const products = responseDataProperty.data;
                    dispatch({type: ProductsActions.GET_ALL, products});
                }
            )
            .catch(
                err => {
                    dispatch({type: ProductsActions.ERROR, error: err});
                }
            )
    }
}

function AppComponent(props: any) {
    const dispatch = props.dispatch;

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <>
            <p>App</p>
        </>
    )
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);