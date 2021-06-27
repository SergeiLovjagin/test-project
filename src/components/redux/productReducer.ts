import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {WritableDraft} from 'immer/dist/internal';
import firebase from '../../firebase';

export const fetchProducts = createAsyncThunk('product/addProducts', (async (arg, thunkAPI) => {
    const db = firebase.firestore();
    try {
        const response = await db.collection('productLists').get()
            .then((querySnapshot) => {
                    let products: { [x: string]: ProductType } = {}
                    querySnapshot.forEach((doc) => {
                        const product = doc.data() as ProductType
                        if (product) {
                            products[doc.id] = product
                        }
                    })
                    return products
                }
            )
        return {productList: response}
    } catch (e) {
    }
}))

export type ProductType = {
    description: string
    photo: string
    price: number
    title: string
    quantity: number
}

const removeFromWarehouse = (state: WritableDraft<{ productList: { [id: string]: ProductType; }; cartItems: { [id: string]: ProductType; }; }>, action: { payload: { id: string, value: ProductType }; type?: string; }) => {
    state.productList = {...state.productList, ...{[action.payload.id]: {...state.productList[action.payload.id], quantity: state.productList[action.payload.id].quantity - 1}}}

    localStorage.setItem('items', JSON.stringify({...state.cartItems}))
}
const incrementInWarehouse = (state: WritableDraft<{ productList: { [id: string]: ProductType; }; cartItems: { [id: string]: ProductType; }; }>, action: { payload: { id: string, value: ProductType }; type?: string; }) => {
    state.productList = {...state.productList, ...{[action.payload.id]: {...state.productList[action.payload.id], quantity: state.productList[action.payload.id].quantity + 1}}}

    localStorage.setItem('items', JSON.stringify({...state.cartItems}))
}


const slice = createSlice({
    name: 'product',
    initialState: {
        productList: {} as { [id: string]: ProductType },
        cartItems: {} as { [id: string]: ProductType }
    },
    reducers: {
        addToShoppingCart(state, action: PayloadAction<{ id: string, value: ProductType }>) {
            if (Object.keys(state.cartItems).find(el => el === action.payload.id)) {
                state.cartItems = {...state.cartItems, ...{[action.payload.id]: {...action.payload.value, quantity: state.cartItems[action.payload.id].quantity + 1}}}
                removeFromWarehouse(state, action)
            } else {
                state.cartItems = {...state.cartItems, ...{[action.payload.id]: {...action.payload.value, quantity: 1}}}
                removeFromWarehouse(state, action)
            }
        },
        incrementCountValue(state, action: PayloadAction<{ id: string; value: ProductType }>) {
            const productId = Object.keys(state.cartItems).find(el => el === action.payload.id)
            if (productId && state.productList[productId].quantity > 0) {
                let product = state.cartItems[productId]
                product.quantity++
                removeFromWarehouse(state, action)
            }
        },
        decrementCountValue(state, action: PayloadAction<{ id: string; value: ProductType }>) {
            const productId = Object.keys(state.cartItems).find(el => el === action.payload.id)
            if (productId && state.cartItems[productId].quantity > 1) {
                let product = state.cartItems[productId]
                product.quantity--
                incrementInWarehouse(state, action)
            } else {
                delete state.cartItems[action.payload.id]
                incrementInWarehouse(state, action)
            }
        },
        addToShoppingCartLocal(state, action: PayloadAction<{ id: string, value: ProductType }>) {
            state.cartItems = {...state.cartItems, [action.payload.id]: action.payload.value}
            state.productList = {
                ...state.productList,
                ...{[action.payload.id]: {...state.productList[action.payload.id], quantity: state.productList[action.payload.id].quantity - action.payload.value.quantity}}
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.fulfilled, ((state, action) => {
            if (action.payload)
                state.productList = action.payload.productList

            //GETTING DATA FROM LOCAL STORAGE
            let localStorageItems = {} as { [id: string]: ProductType }
            const arr = localStorage.getItem('items')
            if (arr) {
                localStorageItems = JSON.parse(arr)
            }
            Object.entries(localStorageItems).map(el => {
                slice.caseReducers.addToShoppingCartLocal(state, {payload: {id: el[0], value: el[1]}, type: ''})
            })
        }))
    }
})


export const productReducer = slice.reducer
export const addToShoppingCart = slice.actions.addToShoppingCart
export const incrementCountValue = slice.actions.incrementCountValue
export const decrementCountValue = slice.actions.decrementCountValue