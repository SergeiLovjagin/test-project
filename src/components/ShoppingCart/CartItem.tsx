import React from 'react';
import {decrementCountValue, incrementCountValue, ProductType} from '../redux/productReducer';
import {RootStateType, useAppDispatch} from '../redux/rootReducer';
import style from './ShoppingCart.module.scss';
import {useSelector} from 'react-redux';

export const CartItem: React.FC<{ value: ProductType; id: string }> = ({value, id}) => {
    const dispatch = useAppDispatch()
    const quantityInStock = useSelector<RootStateType, number>(state => state.product.productList[id].quantity)
    return (
        <div className={style.shoppingCart_item}>
            <img className={style.shoppingCart_item_photo}
                 src={value.photo}
                 alt={'itemImg'}
            />
            <div className={style.shoppingCart_item_desBloc}>
                <h4 className={style.shoppingCart_item_title}>
                    {value.title}
                </h4>
                <p className={style.shoppingCart_item_description}>
                    {value.description}
                </p>
                <h5 className={style.shoppingCart_item_price}>
                    {value.price} $
                </h5>
            </div>
            <div className={style.shoppingCart_item_incDecBlock}>
                <button className={style.shoppingCart_item_decButton} onClick={() => dispatch(decrementCountValue({id, value}))}> -</button>
                <span>{value.quantity}</span>
                <button className={style.shoppingCart_item_incButton} onClick={() => dispatch(incrementCountValue({id, value}))}> +</button>
                <span className={style.shoppingCart_item_inStock}> Available : {quantityInStock}</span>
            </div>
        </div>
    )
}