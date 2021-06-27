import style from './Header.module.scss'
import {useSelector} from 'react-redux';
import {RootStateType} from '../redux/rootReducer';
import {ProductType} from '../redux/productReducer';
import shoppingImg from './../../assets/img/shopping-cart.png'
import {useHistory} from 'react-router-dom';


export const Header = () => {

    const history = useHistory();
    const routeChange = (path: string) => {
        history.push(path);
    }

    const cartItems = useSelector<RootStateType, { [id: string]: ProductType }>(state => state.product.cartItems)

    const quantityOfItemsInCart = () => {
        let values = 0;
        Object.entries(cartItems).map((value, index) => values = values + value[1].quantity)
        return values
    }

    return (
        <div className={style.header}>
            <button className={style.header_button} onClick={() => routeChange('cart')}>
                <img className={style.header_button_img} src={shoppingImg} alt={'itemImg'}/>
                <span className={style.header_itemsCount}>
                                 {quantityOfItemsInCart()}
                </span>
            </button>
            <button style={{padding: '7px'}} onClick={() => routeChange('product')}>BACK</button>
        </div>
    )
}