import {useContext, useState} from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import OrderContext from '../../store/order-context';
import Checkout from './Checkout';

const Cart = (props) => {

    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const order = useContext(OrderContext);
    const totalAmount = `${order.totalAmount.toFixed(2)} руб.`;
    const hasItems = order.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        order.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        order.addItem(item);
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://react-apps-c854c-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: order.items,
            }),
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        order.clearCart();
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {order.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>
                Закрыть
            </button>
            {hasItems && (
                <button className={classes.button} onClick={orderHandler}>
                    Оформить заказ
                </button>
            )}
        </div>
    );

    const cartModalContent = (
        <>
            {cartItems}
            <div className={classes.total}>
                <span>Общая сумма:</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && (
                <Checkout
                    onConfirm={submitOrderHandler}
                    onCancel={props.onClose}
                />
            )}
            {!isCheckout && modalActions}
        </>
    );

    const isSubmittingModalContent = <p>Заказ отправляется...</p>;

    const didSubmitModalContent = (
        <>
            <p>Заказ успешно оформлен!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>
                    Закрыть
                </button>
            </div>
        </>
    );

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;
