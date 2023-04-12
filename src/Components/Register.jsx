import React, { useState } from "react";
import "./Register.css"
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import RegisterPopup from "./RegisterPopup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Register = () => {
    const {register, handleSubmit, formState:{errors}}= useForm()
    const [showPopup, setShowPopup]= useState(false)
    const navigate= useNavigate()

    const closePopup=()=>{
        setShowPopup(false)
        navigate("/")
    }

    const formSubmit= async (data)=>{
        const registerFetch= async()=>{
            try {
                await axios.post('https://pomodoro-serverside.onrender.com/api/user', data)
            } catch (error) {
                console.log(error.message)
            }
        }
        registerFetch()
        // console.log(data)
        setShowPopup(true)
    }

  return (
    <div className="register">
      <Navbar/>
    <div className="register-cont">
        <h1 className="reg-head">Sign Up</h1>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div>
          <input type="text" placeholder="Name" {...register("name", {required:true})}/>
          {errors?.name?.type==="required"?<small>This field is required</small>:""}
        </div>
        <div>
          <input type="text" placeholder="Email" {...register("email", {
            required:true,
            pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
          })}/>
          {errors.email?.type==="required"?<small>This field is required</small>:""}
          {errors.email?.type==="pattern"?<small>Please input valid email</small>:""}
        </div>
        <div>
          <input type="password" placeholder="Password" {...register("password", {required:true, minLength:8})}/>
          {errors.password?.type==="required"?<small>This field is required</small>:""}
          {errors.password?.type==="minLength"?<small>Password length needs to be atleast 8</small>:""}
        </div>
        <div><button className="form-btn" type="submit">Register</button></div>
      </form>
      <p className="acc-exist">Already have an account ? <Link to="/"><span>Click here</span></Link></p>
    </div>
    {showPopup && <RegisterPopup closePopup={closePopup}/>}
    </div>
  );
};

export default Register;
