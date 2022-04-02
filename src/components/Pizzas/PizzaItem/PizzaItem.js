import {useContext} from 'react';
import PizzaItemForm from './PizzaItemForm';
import classes from './PizzaItem.module.css';
import OrderContext from '../../../store/order-context';

const PizzaItem = (props) => {

    const order = useContext(OrderContext);
    const price = `${props.price.toFixed(2)} руб.`;

    const addToCartHandler = amount => {
        order.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        });
    };

    return (
        <li className={classes.pizza}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <PizzaItemForm onAddToCart={addToCartHandler}/>
            </div>
        </li>
    );
};

export default PizzaItem;
