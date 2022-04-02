import React from 'react';

const OrderContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: () => {
    },
    removeItem: () => {
    },
    clearCart: () => {
    }
});

export default OrderContext;
