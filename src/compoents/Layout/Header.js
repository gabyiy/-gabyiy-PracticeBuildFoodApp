import classes from "./Header.module.css";
import { Fragment } from "react";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
//am importat imaginea si o utilizam mai jos

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meal</h1>
        <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
      </header>
      <div>
        <img className={classes["main-image"]} src={mealsImage} />
      </div>
    </Fragment>
  );
};
export default Header;
