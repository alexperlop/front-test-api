import { useState } from "react";
import classes from "../../styles/Checkout.module.css";

const checkIfEmpty = (value) => value.trim().length === 0;
const hasFiveCharacters = (value) => value.trim().length >= 5;

const Checkout = (props) => {
    const [formInputValidity, setInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postal: true,
    });
    const confirmHandler = (event) => {
        event.preventDefault();
        const inputName = event.target.name.value;
        const inputStreet = event.target.street.value;
        const inputPostal = event.target.postal.value;
        const inputCity = event.target.city.value;

        const nameIsValid =
            !checkIfEmpty(inputName) && hasFiveCharacters(inputName);
        const streetIsValid =
            !checkIfEmpty(inputStreet) && hasFiveCharacters(inputStreet);
        const postalIsValid =
            !checkIfEmpty(inputPostal) && hasFiveCharacters(inputPostal);
        const cityIsValid =
            !checkIfEmpty(inputCity) && hasFiveCharacters(inputCity);

        setInputValidity({
            name: nameIsValid,
            street: streetIsValid,
            city: cityIsValid,
            postal: postalIsValid,
        });

        const formIsValid =
            nameIsValid && streetIsValid && postalIsValid && cityIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: inputName,
            street: inputStreet,
            city: inputCity,
            postal: inputPostal,
        });
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={!formInputValidity.name ? ` ${classes.control} ${classes.invalid}` : `${classes.control}`}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" />
                {!formInputValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={!formInputValidity.street ? ` ${classes.control} ${classes.invalid}` : `${classes.control}`}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" />
                {!formInputValidity.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={!formInputValidity.postal ? ` ${classes.control} ${classes.invalid}` : `${classes.control}`}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" />
                {!formInputValidity.postal && <p>Please enter a valid postal code!</p>}
            </div>
            <div className={!formInputValidity.city ? ` ${classes.control} ${classes.invalid}` : `${classes.control}`}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" />
                {!formInputValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
