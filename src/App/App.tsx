import axios from 'axios';
import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import './App.scss';

import { RootState } from '@/_reducers';
import { ProductsActions } from '@/_types';
import { Catalog, Footer, Header } from '@/_components';

function mapStateToProps(state: RootState) {
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
                    dispatch({type: ProductsActions.INIT, products});
                }
            )
            .catch(
                err => {
                    dispatch({type: ProductsActions.ERROR, error: err.message});
                }
            )
    }
}

function AppComponent(props: any) {
    const dispatch = props.dispatch;

    useEffect(() => {
        // Get the list of products and set it in the store
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <>
            <Header />
            <Catalog />
            <Footer />
        </>
    )
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);