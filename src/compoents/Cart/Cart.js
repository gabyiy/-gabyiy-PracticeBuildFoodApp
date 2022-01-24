import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import { useContext } from "react";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`; //salvam in variablia ce avem la total amount si cu toFix ne asiguram ca mereu avem 2 decimale si folosim template litaral ca adaugam dolar si si alte kesti

  //cu has item specifcam daca cartCtx are mai mult de 0 item o sa fie true ,daca nu e false,asta o sa il folosim in button sa ne artate butonu daca avem itemuri
  const hasItems = cartCtx.items.length > 0;

  //aici adaugam si cartItemRemove si cardItemAddHandler functiile astea o sa le transferam in CartItem
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartITemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  //acesam ce avem in cartContext iar dupa cu variabla respectiva facem un map la ce avem in items
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          //asa cu bind specificam ca item id o sa fie trecut la functa noastra,asa specificam ce parametri dorim sa primeasca functtile noastre adica item.id si tot itemu
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartITemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};
export default Cart;
