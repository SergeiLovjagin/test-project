import style from './ShoppingCart.module.scss'
import React from 'react';
import {ProductType} from '../redux/productReducer';
import {useSelector} from 'react-redux';
import {RootStateType} from '../redux/rootReducer';
import {CartItem} from './CartItem';


export const ShoppingCart = () => {
    const cartItems = useSelector<RootStateType, { [id: string]: ProductType }>(state => state.product.cartItems)

    const totalItemsPrice = () => {
        let total = 0
        Object.values(cartItems).map(el => {
            const price = el.quantity * el.price
            return total += price
        })
        return total
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            name: { value: string };
            surname: { value: string };
            address: { value: string };
            phone: { value: string };
        };

        const contacts = {
            name: target.name.value,
            surname: target.surname.value,
            address: target.address.value,
            phone: target.phone.value
        }

        const orderItems = Object.entries(cartItems).map(value => {
            return {id: value[0], quantity: value[1].quantity}
        })

        if (Object.keys(cartItems).length > 0 && Object.values(contacts).every(el => el !== '')) {
            const values = JSON.stringify({...contacts, order: orderItems})
            alert(values)
        }
    }

    const items = Object.entries(cartItems).map((value, index, array) => {
        return value[1].quantity > 0
            &&
            <CartItem key={value[0]} value={value[1]} id={value[0]}/>
    })

    return (
        <div className={style.shoppingCart}>
            <div className={style.shoppingCart_items}>
                {items}
            </div>
            <form className={style.shoppingCart_form} onSubmit={handleSubmit}>
                <input className={style.shoppingCart_form_input} name={'name'} placeholder={'name'}/>
                <input className={style.shoppingCart_form_input} name={'surname'} placeholder={'surname'}/>
                <input className={style.shoppingCart_form_input} name={'address'} placeholder={'address'}/>
                <input className={style.shoppingCart_form_input} name={'phone'} placeholder={'phone'}/>
                <button className={style.shoppingCart_button} type={'submit'}>ORDER</button>
                <span style={totalItemsPrice() > 0 ? {display: 'block'} : {display: 'none'}}> {'Total : ' + totalItemsPrice() + ' $'} </span>
            </form>
        </div>
    )
}


