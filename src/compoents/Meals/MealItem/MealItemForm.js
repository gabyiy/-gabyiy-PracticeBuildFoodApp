import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  //iar aici instantiem inputu creat si ii trecem ca parametru labelu si la input un obiect cu tot ce are nevoie sa destructureze si sa extraga continutul in Inputu din UI

  //creem constanta de tip userf pentru a putea trimite datele la componentu nostru Input si primim aces pentru  a vedea datele si le putea extrage in submitHandler

  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  //eventu submitHandler o sa il folosim sa trimitem datele in cartProvider iar dupa le derivam la Cart compoent
  const submitHandler = (event) => {
    event.preventDefault();
    //aceasta valuare este mereu un string si e posibil sa dorim sa o convertim la un numar cu +
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+Add</button>
      {!amountIsValid && <p>Please enter a valid amount(1-5)</p>}
    </form>
  );
};
export default MealItemForm;
