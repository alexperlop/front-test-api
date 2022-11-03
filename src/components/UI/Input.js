import React from "react"
import { Fragment } from "react"

const Input = React.forwardRef((props, ref) => {
    return (
        <Fragment>
            <label htmlFor={props.input.id} className={props.input.class}>{props.input.content}</label>
            <input ref={ref} {...props.input} />
        </Fragment>
    )

})

export default Input