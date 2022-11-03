import '../../styles/AddProduct.css'
import Input from '../UI/Input'
import { useRef, useState } from 'react'

const AddProducts = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef()
    const submitHandler = (event) => {
        event.preventDefault()
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1) {
            setAmountIsValid(false)
            return;
        }
        props.onAddToCart(enteredAmountNumber)
    }
    const errorMessage = <p>Please entered a valid amount</p>;
    const inputConfig = {
        id: `amount`,
        type: 'number',
        min: 1,
        step: 1,
        defaultValue: 1
    }
    return <form className='feapi-form' onSubmit={submitHandler}>
        <Input ref={amountInputRef} label='Amount' input={inputConfig} />
        <button type='submit'>Add</button>
        {!amountIsValid && errorMessage}
    </form>
}

export default AddProducts