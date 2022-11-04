import '../../styles/AddProduct.css'
import Input from '../UI/Input'
import { useRef, useState } from 'react'

const AddProducts = (props) => {
    const OPTIONS_COLOR = 'colors';
    const OPTIONS_MEMORY = 'storages'
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
        props.onAddToCart(enteredAmountNumber, event.target.color.value, event.target.memory.value)
    }
    const errorMessage = <p>Please entered a valid amount</p>;
    const inputConfig = {
        id: `amount`,
        type: 'number',
        min: 1,
        step: 1,
        defaultValue: 1,
        content: 'Amount: '
    }
    return <form className='feapi-form' onSubmit={submitHandler}>
        <div className='feapi-form__group'>
            <label>Memory:</label>
            <select name='memory' id="memory">
                {props.option[OPTIONS_MEMORY].map(item => <option value={item.name}>{item.name}</option>)}
            </select>
        </div>
        <div className='feapi-form__group'>
            <label>Color:</label>
            <select name='color' id="color">
                {props.option[OPTIONS_COLOR].map(item => <option value={item.name}>{item.name}</option>)}
            </select>
        </div>
        <div className='feapi-form__add'>
            <Input ref={amountInputRef} label='Amount' input={inputConfig} />
        </div>
        <button type='submit'>Add</button>
        {!amountIsValid && errorMessage}
    </form >
}

export default AddProducts