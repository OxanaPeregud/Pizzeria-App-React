import {useEffect, useState} from 'react';
import Card from '../UI/Card';
import PizzaItem from './PizzaItem/PizzaItem';
import classes from './PizzasMenu.module.css';

const PizzasMenu = () => {

    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchPizzas = async () => {
            const response = await fetch('https://react-apps-c854c-default-rtdb.firebaseio.com/pizzas.json');

            if (!response.ok) {
                throw new Error('Что-то пошло не так!');
            }

            const responseData = await response.json();

            const loadedPizzas = [];

            for (const key in responseData) {
                loadedPizzas.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                });
            }

            setPizzas(loadedPizzas);
            setIsLoading(false);
        };

        fetchPizzas().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if (isLoading) {
        return (
            <section className={classes.PizzasLoading}>
                <p>Загружается...</p>
            </section>
        );
    }

    if (httpError) {
        return (
            <section className={classes.PizzasError}>
                <p>{httpError}</p>
            </section>
        );
    }

    const pizzasList = pizzas.map((pizza) => (
        <PizzaItem
            key={pizza.id}
            id={pizza.id}
            name={pizza.name}
            description={pizza.description}
            price={pizza.price}
        />
    ));

    return (
        <section className={classes.pizzas}>
            <Card>
                <ul>{pizzasList}</ul>
            </Card>
        </section>
    );
};

export default PizzasMenu;
