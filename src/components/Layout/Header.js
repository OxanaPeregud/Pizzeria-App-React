import HeaderCartButton from './HeaderCartButton';
import pizzeriaImage from '../../assets/pizzeria.jpg';
import classes from './Header.module.css';

const Header = (props) => {

    return (
        <>
            <header className={classes.header}>
                <h1>Pizzeria</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={pizzeriaImage} alt='Welcome to Pizzeria!'/>
            </div>
        </>
    );
};

export default Header;
