import { useReducer } from "react";
import CartContext from "./cart-context";

//asa practic returnam compontu CartContext de tip provider ,si cu props.children facem ca sa aibe acces  toate comp[onentel care seafla in cartProvider]

//aici adaugam niste functi pe care le salvam intrun obiect denumit cartContext
//iar folosind value la CartContext.Provider putem acesa ce avem in obiectu cartContext din orcare componente care se afla in CartContext.Provider

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

//creem o const cartReducer unde state este ultima valuare,iar cu actionb facem dispachurile noi
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    //asta facem ca sa nu ne mai apara un produs cu acelasi nume de mai multe ori
    //si aici adaugam o fuctie care no sa ne dea true in caz ca se adeverste adica daca item.id este lafel cu id itemului pe care il adaugam

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    //aici in caz ca existingCartItemIndex nu estista o sa salvam o valuare null dar in caz ca existam o sa ii salvam valuarea
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    //daca existingCartItem are o valuare adica true
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      ///cu ajutoru la concat creem un nou state item al action.item
      updatedItems = state.items.concat(action.item);
    }

    //asa aflam cu cat total amaount trebuie sa se schimbe si dupa retrurnam updatand practiem  item si totalAmaunt

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};
const CartProvider = (props) => {
  //initiem useReducer  cu primu parametru fiind functia const cartReducer cu care o sa chimbvam statusul initial si al doile statul initial care este defaultCartState
  const [cartState, dispachCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  //in functia addItemToCartHandler utiliziam dispach pentru a crea un obiectu cu type add si salvam ce avem la fuctie adica item si o trimitem mai departe la useReducer in action

  const addItemToCartHandler = (item) => {
    dispachCartAction({ type: "ADD", item: item });
  };

  //  //acelasi lucru facem si aici

  const removeItemFromCartHandler = (id) => {
    dispachCartAction({ type: "REMOVE", id: id });
  };
  //aici in cartContext updatam ce avem inauntru cu ce o sa obtinem la cartState
  const cartContex = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContex}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
