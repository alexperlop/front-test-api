import { useContext } from 'react'
import '../../styles/Product.css'
import CartContext from '../../store/cart-context'
import AddProducts from './AddProducts'

const Product = (props) => {
    const cartCtx = useContext(CartContext);
    const price = `${props.price}€`
    const addToCartHandler = (amount) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    }
    return (
        <li className="feapi-item" key={props.id}>
            <figure>
                <img src={props.imgUrl} alt="" />
            </figure>
            <h3>{props.name}</h3>
            <p>{props.brand}</p>
            <span>{price ? price : '€'}</span>
            <AddProducts onAddToCart={addToCartHandler} />
        </li>)
}

export default Product