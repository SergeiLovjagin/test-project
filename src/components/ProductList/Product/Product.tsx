import style from './Product.module.scss'
import React from 'react';
import {RootStateType, useAppDispatch} from '../../redux/rootReducer';
import {addToShoppingCart, ProductType} from '../../redux/productReducer';
import {useSelector} from 'react-redux';


export const Product: React.FC<{ id: string, value: ProductType }> = ({id, value}) => {
    const dispatch = useAppDispatch()

    const quantityInStock = useSelector<RootStateType, number>(state => state.product.productList[id].quantity)

    const addProductHandler = () => {
        dispatch(addToShoppingCart({id, value}))
    }

    return (
        <div className={style.product}>
            <div className={style.product_photo_block}>
                <img className={style.product_photo}
                     src={value.photo}
                     alt={'itemImg'}
                />
                <h5 className={style.product_price}>
                    {value.price} $
                </h5>
                <span className={style.product_inStock}>In stock : {quantityInStock}</span>
            </div>
            <div className={style.product_content}>
                <h4 className={style.product_title}>
                    {value.title}
                </h4>
                <p className={style.product_content_description}>
                    {value.description}
                </p>
                <button className={style.product_content_button}
                        onClick={addProductHandler}>
                    Add to cart
                </button>
            </div>
        </div>
    )
}