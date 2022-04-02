import {useState} from 'react';
import Header from './components/Layout/Header';
import Pizzas from './components/Pizzas/Pizzas';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {

    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };

    return (
        <CartProvider>
            {cartIsShown && <Cart onClose={hideCartHandler}/>}
            <Header onShowCart={showCartHandler}/>
            <main>
                <Pizzas/>
            </main>
        </CartProvider>
    );
}

export default App;
