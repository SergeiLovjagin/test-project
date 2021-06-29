import {decrementCountValue, incrementCountValue, productReducer, ProductType} from '../redux/productReducer';

let initialState = {
    productList: {} as { [id: string]: ProductType },
    cartItems: {} as { [id: string]: ProductType }
}
beforeEach(() => {
    initialState = {
        productList: {
            [1]: {title: 'Title №1', description: 'Title №1', quantity: 1, price: 15, photo: ''},
            [2]: {title: 'Title №2', description: 'Title №2', quantity: 2, price: 25, photo: ''},
            [3]: {title: 'Title №3', description: 'Title №3', quantity: 1, price: 35, photo: ''},
            [4]: {title: 'Title №4', description: 'Title №4', quantity: 0, price: 45, photo: ''}
        },
        cartItems: {
            [3]: {title: 'Title №3', description: 'Title №3', quantity: 3, price: 35, photo: ''},
            [4]: {title: 'Title №4', description: 'Title №4', quantity: 1, price: 45, photo: ''}
        }
    }
})


test('the product must be added to the cart when clicked +', () => {
    const {photo,description,quantity,title,price } = initialState.productList[3]

    const action = incrementCountValue({id: '3', value: {photo,price,quantity,description,title}});
    const endState = productReducer(initialState, action)

    expect(endState.cartItems[3].description).toBe('Title №3')
    expect(endState.productList[3].quantity).toBe(0)
    expect(endState.cartItems[3].quantity).toBe(4)
})

test('if there is one item in the cart, it should be deleted when clicked -', () => {
    const {photo,description,quantity,title,price } = initialState.cartItems[4]

    const action = decrementCountValue({id: '4', value: {photo,price,quantity,description,title}});
    const endState = productReducer(initialState, action)

    expect(endState.cartItems[4]).toBeUndefined()
    expect(Object.keys(endState.cartItems).length).toBe(1)

})

