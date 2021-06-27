import {combineReducers} from 'redux';
import {productReducer} from './productReducer';
import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    product: productReducer
})

export type RootStateType = ReturnType<typeof store.getState>

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .prepend(thunk);
    }
})

type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()

// @ts-ignore
window.store = store

