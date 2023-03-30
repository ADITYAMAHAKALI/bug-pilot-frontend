import React, { useState } from "react";
import { useGlobalContext, useProjectContext } from '../context';
import { Navigate, useNavigate } from "react-router-dom";
const Login = () => {
  const {user,setUser} = useGlobalContext(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //------------------- user Api -------------------//
  const getUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:9090/api/users/${id}`);
      const data = await response.json();
      // console.log('data', data)
      const new_user = {
        "id": data.userId,
        "email": data.email,
        "username": data.username
      }
      return new_user
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault()
    const loginObj = {
      "email": email,
      "password": password
    };
    await fetch("http://localhost:9090/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginObj),
    })
      .then(async (res) => {
        console.log("res", res)
        if(res.status === 200){
          //console.log("Login Success")
          const data = await res.json()
          // we will get the user id
          const new_user = await getUser(data.id)
          console.log('new_user', new_user)
          await setUser(new_user)
            // if the user is logged in we can redirect to the dashboard
          console.log(user)
          // if(new_user !== undefined){
          //   setUser(new_user)
          //   // if the user is logged in we can redirect to the dashboard
          //   console.log(user)
          localStorage.setItem('user', JSON.stringify(new_user))
            navigate("/dashboard")
          // }else{
          //   console.log("Some Unknown Error Occured")
          // }
          // if the login is successfull then we want to redirect to
          // the dashboard of a particula user
        }else{
          console.log("Login Failed")
          // in this case we want some message so that user cant 
          // enter correct credentials or user doesn't exist
        }
      })
      
      
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="email"
          id="email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          id="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
