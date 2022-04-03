import classes from './PizzasSummary.module.css';

const PizzasSummary = () => {

    return (
        <section className={classes.summary}>
            <h3>
                Порадуйте себя и своих близких пиццей из Pizzeria
            </h3>
            <p>
                Наши повара знают толк в искусстве выпечки настоящей пиццы. Каждое блюдо из нашего меню разработано с
                учетом всех тонкостей европейской кухни: сочетание отборных сыров, свежих помидоров, грибов, нежнейших
                соусов и свежего теста.
            </p>
        </section>
    );
};

export default PizzasSummary;
