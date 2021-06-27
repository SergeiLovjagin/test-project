import React from 'react';
import './App.css';
import 'firebase/database';
import {Header} from './components/Header/Header';
import {ProductList} from './components/ProductList/ProductList';
import {useAppDispatch} from './components/redux/rootReducer';
import {fetchProducts} from './components/redux/productReducer';
import {ShoppingCart} from './components/ShoppingCart/ShoppingCart';
import {Redirect, Route, Switch} from 'react-router-dom';

function App() {

    const dispatch = useAppDispatch()
    dispatch(fetchProducts())

    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route exact path='/'
                       render={() => <Redirect to={'/product'}/>}/>
                <Route exact path={'/product'} render={() => <ProductList/>}/>
                <Route exact path={'/cart'} render={() => <ShoppingCart/>}/>
            </Switch>
        </div>
    )
}

export default App;
