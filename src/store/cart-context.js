import React from "react";


let initialValue = {
    items: [],
    totalAmount: 0,
    addItem: (item) => { },
    removeItem: (id) => { }
};

const CartContext = React.createContext(initialValue)

export default CartContext;