
import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context'
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import '../../styles/Cart.css'

const Cart = (props) => {
    const cartCtx = useContext(CartContext)
    const [isSubmitting, setIsSubmiting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const [httpError, setHttpError] = useState(false)
    const totalAmount = `${cartCtx.totalAmount.toFixed(2)}€`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }
    const cartItemAddHandler = (item) => {
        cartCtx.addItem(item)
    }
    const submitOrderHandler = async (event) => {
        event.preventDefault()
        let { id, option, color, internalMemory } = cartCtx.items[0]
        let codeColor, codeMemory;
        for (const key in option) {
            option[key].map(el => {
                if (el.name === color) {
                    codeColor = el.code
                }
                if (el.name === internalMemory) {
                    codeMemory = el.code
                }
            })
        }
        setIsSubmiting(true)
        const response = await fetch('https://front-test-api.herokuapp.com/api/cart', {
            method: 'POST',
            body: JSON.stringify({
                id: parseInt(id),
                colorCode: codeColor,
                storageCode: codeMemory
            })
        })
        setIsSubmiting(false)
        setDidSubmit(true)
        if (!response.ok) {
            setHttpError(true)
        }
    }
    const formContent = <form onSubmit={submitOrderHandler}>
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
            {hasItems && <button className='button' type='submit'>Order</button>}
        </div>
    </form>;
    const isSubmittingModalContent = <p>Sending order data</p>
    const didSubmitModalContent = <p>Succesfully sent the order</p>
    const httpErrorMessage = <p>Error in server please try later</p>

    return <Modal onHideCart={props.onHideCart}>
        {!isSubmitting && !didSubmit && formContent}
        {isSubmitting && isSubmittingModalContent}
        {didSubmit && !httpError && didSubmitModalContent}
        {didSubmit && httpError && httpErrorMessage}
    </Modal >
}

export default Cart