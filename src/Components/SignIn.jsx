import React, { useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./SignIn.css"
import { useForm } from 'react-hook-form'
import axios from 'axios'
import AuthContext from './context'
import Navbar from './Navbar'

const SignIn = () => {
    const {register, handleSubmit, formState:{errors}}= useForm()
    const [token, setToken]= useContext(AuthContext)
    const navigate= useNavigate()

    const formSubmit= (data)=>{
        // console.log(data)
        const userFetch= async()=>{
            try {
                const fetchData= await axios.post('https://pomodoro-serverside.onrender.com/api/userLogin', data)
                setToken(fetchData.data.token)
                localStorage.setItem("tokenCookie", fetchData.data.token)
                // console.log(fetchData.data.token)
                navigate("/home")

            } catch (error) {
                alert("Please input valid credentials")
                console.log(error.message)
            }
        }
        userFetch()
    }

  return (
        <div className="register">
            <Navbar/>
    <div className="register-cont">
        <h1 className="reg-head">Sign In</h1>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div>
          <input type="text" placeholder="Email" {...register("email", {required:true})}/>
          {errors.email?.type==="required"?<small>This field is required</small>:""}
        </div>
        <div>
          <input type="password" placeholder="Password" {...register("password", {required:true})}/>
          {errors.password?.type==="required"?<small>This field is required</small>:""}
        </div>
        <div><button type='submit' className="form-btn">Login</button></div>
      </form>
      <p className="acc-exist">Don't have an account ? <Link to="/register"><span>Click here to register</span></Link></p>
    </div>
    </div>
  )
}

export default SignIn