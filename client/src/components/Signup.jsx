import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../App";
import { DoneLogin } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { Authenticated } = useSelector((state) => state.Users);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/user/signup`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      dispatch(DoneLogin());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const signuphandler = () => {
    navigate("/signup");
  };

  if (Authenticated) return <Navigate to={"/"} />;
  return (
    <>
      <div className="signuppage">
        <form onSubmit={submitHandler}>
          <input
            name="name"
            type="text"
            placeholder="FullName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            name="emai"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Signup</button>
          <a href="/login">already have a account ?</a>
        </form>
      </div>
      ;
    </>
  );
};

export default Signup;
