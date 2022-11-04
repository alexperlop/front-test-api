import '../../styles/AddProduct.css'
import Input from '../UI/Input'
import { useRef, useState } from 'react'

const AddProducts = (props) => {
    console.log("🚀 ~ file: Addproducts.js ~ line 6 ~ AddProducts ~ props", props)
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
        <div className='feapi-form__group'>
            <select name='memory' id="memory">
                {props.memory.map(item => <option value={item}>{item}</option>)}
            </select>
            <select name='color' id="color">
                {props.colors.map(item => <option value={item}>{item}</option>)}
            </select>
        </div>
        <div className='feapi-form__group'>
            <Input ref={amountInputRef} label='Amount' input={inputConfig} />
            <button type='submit'>Add</button>
        </div>
        {!amountIsValid && errorMessage}
    </form>
}

export default AddProducts