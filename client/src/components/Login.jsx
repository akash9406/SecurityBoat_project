import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { DoneLogin } from "../redux/userSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { Authenticated } = useSelector((state) => state.Users);
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${server}/user/login`,
        {
          email,
          password,
        },
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
      <div className="loginpage">
        <form onSubmit={submitHandler}>
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
          <button type="submit">Login</button>
          <button onClick={signuphandler}>Signup</button>
        </form>
      </div>
      ;
    </>
  );
};

export default Login;
