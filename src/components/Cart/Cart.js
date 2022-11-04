
import { useContext } from 'react';
import CartContext from '../../store/cart-context'
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import '../../styles/Cart.css'

const Cart = (props) => {
    const cartCtx = useContext(CartContext)
    const totalAmount = `${cartCtx.totalAmount.toFixed(2)}€`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }
    const cartItemAddHandler = (item) => {
        cartCtx.addItem(item)
    }

    return <Modal onHideCart={props.onHideCart}>
        <ul className="cart-items">
            {cartCtx.items.map(el =>
                <CartItem
                    key={el.id}
                    id={el.id}
                    name={el.name}
                    amount={el.amount}
                    price={el.price}
                    color={el.color}
                    memory={el.internalMemory}
                    onRemove={cartItemRemoveHandler.bind(null, el.id)}
                    onAdd={cartItemAddHandler.bind(null, el)} />)
            }
        </ul>
        <div className='total'>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className='actions'>
            <button className='button--alt' onClick={props.onHideCart}>Close</button>
            {hasItems && <button className='button'>Order</button>}
        </div>
    </Modal>
}

export default Cart