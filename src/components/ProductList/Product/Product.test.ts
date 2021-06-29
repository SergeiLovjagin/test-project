import {addToShoppingCart, productReducer, ProductType} from '../../redux/productReducer';

let initialState = {
    productList: {} as { [id: string]: ProductType },
    cartItems: {} as { [id: string]: ProductType }
}
beforeEach(() => {
    initialState = {
        productList: {
            [1]: {title: 'Title №1', description: 'Title №1', quantity: 1, price: 15, photo: ''},
            [2]: {title: 'Title №2', description: 'Title №2', quantity: 2, price: 25, photo: ''},
            [3]: {title: 'Title №3', description: 'Title №3', quantity: 3, price: 35, photo: ''}
        },
        cartItems: {}
    }
})

test('the product must be added to the cart and 1 item must be removed from the database', () => {
    const {photo,description,quantity,title,price } = initialState.productList[2]

    const action = addToShoppingCart({id: '2', value: {photo,price,quantity,description,title}});

    const endState = productReducer(initialState, action)

    expect(endState.cartItems[2].description).toBe('Title №2')
    expect(endState.productList[2].quantity).toBe(1)
})