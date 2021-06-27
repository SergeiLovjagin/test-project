import {Product} from './Product/Product'
import style from './ProductList.module.scss'
import {useSelector} from 'react-redux';
import {RootStateType} from '../redux/rootReducer';
import {ProductType} from '../redux/productReducer';

export const ProductList = () => {

    const productList = useSelector<RootStateType, { [id: string]: ProductType }>(state => state.product.productList)

    const productItems = Object.entries(productList).map((value, index, array) => {
        if (value[1].quantity > 0)
            return <Product key={value[0]} id={value[0]} value={value[1]}/>
    })

    return (
        <div className={style.product_list}>
            {productItems}
        </div>
    )
}