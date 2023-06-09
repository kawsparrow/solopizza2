import React from "react";
import emptyCartImg from "../assets/img/empty-cart.png";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <>
      {" "}
      <div className="cart cart--empty">
        <h2>
          კალათა ცარიელია <span>😕</span>
        </h2>
        <p>
          სავარაუდოდ თქვენ არ შეგიკვეთავთ ჯერ პიცა.
          <br />
          პიცის შეკვეთისთვის გთხოვთ გადახვიდეთ მთავარ გვერდზე.
        </p>
        <img src={emptyCartImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>უკან დაბრუნება</span>
        </Link>
      </div>
    </>
  );
};

export default EmptyCart;
