import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "../../styles/Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const [httpError, setHttpError] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `${cartCtx.totalAmount.toFixed(2)}€`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    let colour, storage;
    let id, option, color, internalMemory

    if (hasItems) {
        id = cartCtx.items[0].id
        option = cartCtx.items[0].option
        color = cartCtx.items[0].color
        internalMemory = cartCtx.items[0].internalMemory
    }

    for (const key in option) {
        option[key].map(el => {
            if (el.name.includes(color)) {
                colour = el.code
            }
            if (el.name.includes(internalMemory)) {
                storage = el.code
            }
        })
    }

    const confirmHandler = async (userData) => {
        setIsSubmitting(true);
        const response = await fetch(
            "https://front-test-api.herokuapp.com/api/cart",
            {
                method: "POST",
                body: JSON.stringify({
                    id: id,
                    colorCode: colour,
                    storageCode: storage,
                }),
            }
        );
        setIsSubmitting(false);
        setDidSubmit(true);

        if (!response.ok) {
            setHttpError(true)
        } else {
            cartCtx.clearCart();
        }
    };

    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    color={item.color}
                    memory={item.internalMemory}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const actionsModal = (
        <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onHideCart}>
                Close
            </button>
            {hasItems && (
                <button className={classes.button} onClick={orderHandler}>
                    Order
                </button>
            )}
        </div>
    );

    const modalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && (
                <Checkout onConfirm={confirmHandler} onCancel={props.onHideCart} />
            )}
            {!isCheckout && actionsModal}
        </React.Fragment>
    );

    const submittingContent = <p>Sending order data ...</p>;
    const submitContent = (
        <React.Fragment>
            <p>Succesfully sent the order</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onHideCart}>
                    Close
                </button>
            </div>
        </React.Fragment>
    );

    const httpErrorContent = <div className={classes.actions}>
        <p>We are having some problems, please try again later</p>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
            Close
        </button>
    </div>

    return (
        <Modal onClose={props.onHideCart}>
            {!didSubmit && !isSubmitting && modalContent}
            {isSubmitting && submittingContent}
            {didSubmit && !httpError && submitContent}
            {didSubmit && httpError && httpErrorContent}
        </Modal>
    );
};

export default Cart;
