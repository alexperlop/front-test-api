import '../../styles/CartItem.css';

const CartItem = (props) => {
    const price = `${props.price}€`;

    return (
        <li className='cart-item'>
            <div>
                <h2>{props.name}</h2>
                <div className='cart-items__summary'>
                    <span className='cart-items__price'>{price}</span>
                    <span className='cart-items__amount'>x {props.amount}</span>
                </div>
            </div>
            <div className='cart-items__actions'>
                <button onClick={props.onRemove}>−</button>
                <button onClick={props.onAdd}>+</button>
            </div>
        </li>
    );
};

export default CartItem;