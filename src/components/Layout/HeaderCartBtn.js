import { useContext, useState, useEffect } from "react";
import CartContext from '../../store/cart-context'
import "../../styles/HeaderCartBtn.css";

const HeaderCartBtn = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;
    const btnClasses = `feapi-cart__button ${btnIsHighlighted ? 'feapi-cart__bump' : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    const numOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0);

    return (<button className={btnClasses} onClick={props.onClick}>
        <span className="feapi-cart__icon">
            <i className="bi bi-cart"></i>
        </span>
        <span>{props.text}</span>
        <span className="feapi-cart__badge">{numOfCartItems}</span>
    </button>)
}

export default HeaderCartBtn;