import React, { useEffect, useRef, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { FaRegFaceGrinHearts } from "react-icons/fa6";
import { IoBagOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import DropdownItem from "./DropdownItem";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../App";
import { NotLogin, removeUser } from "../redux/userSlice";
import toast from "react-hot-toast";
import axios from "axios";
const Header = () => {
  const dispatch = useDispatch();
  const { Authenticated, User } = useSelector((state) => state.Users);
  const [open, setOpen] = useState(false);
  let menuRef = useRef();

  const logoutHandler = async () => {
    try {
      await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });
      dispatch(NotLogin());
      dispatch(removeUser());
      toast.success("logout done");
    } catch (error) {
      console.log(error);
      toast.error("failed to logout");
    }
  };
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  return (
    <>
      <header>
        <div className="logo_container">
          <Link to="/">
            <img
              className="myntra_home"
              src="images/myntra_logo.webp"
              alt="Myntra Home"
            />
          </Link>
        </div>
        <nav className="nav_bar">
          <a href="#">Men</a>
          <a href="#">Women</a>
          <a href="#">Kids</a>
          <a href="#">Home & Living</a>
          <a href="#">Beauty</a>
          <a href="#">
            Studio <sup>New</sup>
          </a>
        </nav>
        <div className="search_bar">
          <span className="material-symbols-outlined search_icon">search</span>
          <input
            className="search_input"
            placeholder="Search for products, brands and more"
          />
        </div>

        <div className="action_bar">
          <div className="action_container" ref={menuRef}>
            <div
              className="menu-trigger"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <BsFillPersonFill />
              <span className="action_name">Profile</span>
            </div>
            <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
              {!Authenticated ? (
                <div className="dropdown-Btn">
                  <div className="dropdown-btn-1">
                    <h3>Welcome</h3>
                    <p>To access account and manage orders</p>
                    <Link to={"/login"} className="dropdown-btn-main">
                      LOGIN / SIGNUP
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="drop-btn-1">
                  <p>Hello {User.name}</p>
                  <button onClick={logoutHandler} className="dropdown-btn-main">
                    Logout
                  </button>
                </div>
              )}

              <div className="dropdown-ul">
                <a href="#">Orders</a>
                <a href="#">Wishlist</a>
                <a href="#">Gift Cards</a>
                <a href="#">Contact Us</a>
              </div>
            </div>
          </div>

          <div className="action_container">
            <a href="">
              {" "}
              <FaRegFaceGrinHearts />
            </a>
            <span className="action_name">Wishlist</span>
          </div>

          <Link to={"/cart"} className="action_container">
            <IoBagOutline />
            <span className="action_name">Bag</span>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
