import {useContext, useEffect, useState} from 'react';
import CartIcon from '../Cart/CartIcon';
import OrderContext from '../../store/order-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {

    const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
    const orderedPizzas = useContext(OrderContext);
    const {items} = orderedPizzas;

    const numberOfOrderedPizzas = items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setButtonIsHighlighted(true);

        const timer = setTimeout(() => {
            setButtonIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Корзина</span>
            <span className={classes.badge}>{numberOfOrderedPizzas}</span>
        </button>
    );
};

export default HeaderCartButton;
