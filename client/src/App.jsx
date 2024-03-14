import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { DoneLogin, NotLogin, removeUser, setUser } from "./redux/userSlice";
import axios from "axios";
import { fetchItemsByUserIdAsync } from "./redux/cartSlice";
const Home = lazy(() => import("./components/Home"));
const Cart = lazy(() => import("./components/Cart"));
const Signup = lazy(() => import("./components/Signup"));
const Login = lazy(() => import("./components/Login"));
export const server = "http://localhost:4000";
const App = () => {
  const dispatch = useDispatch();
  const { Authenticated, User } = useSelector((state) => state.Users);
  useEffect(() => {
    console.log(Authenticated);
    dispatch(fetchItemsByUserIdAsync());
    axios
      .get(`http://localhost:4000/user/me`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(DoneLogin());
        dispatch(setUser(res.data.user));
      })
      .catch((err) => {
        dispatch(NotLogin());
        dispatch(removeUser());
      });
  }, [Authenticated]);
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
};
export default App;
