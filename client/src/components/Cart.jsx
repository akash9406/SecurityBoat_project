import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectCartLoaded,
  selectCartStatus,
  selectItems,
} from "../redux/cartSlice";
import { Navigate } from "react-router-dom";
const Cart = () => {
  const dispatch = useDispatch();
  const { Authenticated } = useSelector((state) => state.Users);
  const items = useSelector(selectItems);
  console.log(items);
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };
  if (!Authenticated) return <Navigate to={"/login"} />;
  return (
    <>
      <div className="cardwrapper">
        <div className="card-main">
          {items &&
            items.map((item) => (
              <div className="cardsingle" key={item.id}>
                <div className="img-container">
                  <img src={item.product.thumbnail} alt={item.product.title} />
                </div>
                <div className="main-content">
                  <div>
                    <h3>{item.product.title}</h3>
                    <p>${item.product.price}</p>
                  </div>
                  <div>
                    <p>{item.product.brand}</p>
                    <label htmlFor="quantity">Qty</label>
                    <select name="quantity">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <div className="cartbtn">
                    <button>Buy</button>
                    <button onClick={(e) => handleRemove(e, item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Cart;
