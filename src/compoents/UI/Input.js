import classes from "./Input.module.css";
import React from "react";

//Ca sa putem folos ref in meaItemForm prin acest input trebuie sa introducem tot compoentu intrun forward ref
//si dupa sa specificam ca la ref dorim sa avem ce avem la ref unde chemam inputu adica mealitemform
const Input = React.forwardRef((props, ref) => {
  //acesta o sa fie un in put universal cand primi date in acest compoent o sa le primim de forma setata de unde le aduce adica  prin props ca si buttonu sau card

  //cu html for specificam ca o sa primit un input id si cu destrcturarea ...props.input specificam ca dorim sa avem to ce contine inputu de unde inportam adica type="text" de ex
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});
export default Input;
