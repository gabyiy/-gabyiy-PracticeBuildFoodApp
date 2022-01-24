import Cart from "../Cart/Cart";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { useContext, useState, useEffect } from "react";
import CartContext from "../../store/cart-context";
const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx; //asa scoate din carftCtx doar items

  //cuj ajutoru la reduce  transformam un array intrun single value acesta primieste doi parametri,primu este o functie si al doilea o valoare initiala.Fuctia primeste doi parametri (primu valoarea curenta care la inceput o sa fie 0 dar dupa o sa fie ce avem la return  ,iar adoua fiind fiecare item in parte  )
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const [btnHigligthed, setBtnHigligthed] = useState(false);

  //am creat o const cu doua clase si cu ajutoru la use efect si use state putem crea o variabila care se resteaza odatata la cateva secunde astefel dupa un timp daca adaugam dinou la cart o sa ne apara efectu de bump
  const btnClasses = `${classes.button} ${btnHigligthed ? classes.bump : ""} `;

  ///specifacam ca sa se faca in true doar daca cartItem >0
  useEffect(() => {
    //daca lengthu la items este 0  sa nu ne returneze nimic
    if (items.length === 0) {
      return;
    } //altfel daca este mai mare de 0 logic si automat o sa treaca true
    setBtnHigligthed(true);
    //iar nupa 3 secunde de la activare cu setTimout specificam ca dorim sa il treaca inpoi la false
    const timer = setTimeout(() => {
      setBtnHigligthed(false);
    }, 300);

    //  facand un return in useEffect practic creem  un clean up fuction (e bvine mereu sa facem un clear timer)
    return () => {
      clearTimeout(timer);
    };

    //aici specificam ca defiecare data cand avem o schimbvare in items sa reevalueze ce avem in useEffect
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
      {props.children}
    </button>
  );
};
export default HeaderCartButton;
