import classes from "./Modal.module.css";
import { Fragment } from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>;
  };

  const ModalOverlay = (props) => {
    return (
      <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
      </div>
    );
  };

  const portalElement = document.getElementById("overlays");
  //am crea o const unde am salvat portalu creat in idex si il trecem ca parametru de reper in destinatie
  return (
    //trecandui ca paramatru onClose spnem ca asteptam o fuctie de acest tipp(practc este sa inchidem  cartu dinafara mdalului),iar ca sa il aducem aici trebuie sa adaugam unde chemam modalu adica in cart  functia on close
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};
export default Modal;
