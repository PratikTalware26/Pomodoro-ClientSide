import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "./context";

const Home = () => {
  const [time, setTime] = useState(1500);
  const [work, setWork] = useState(false);
  const [breakTime, setBreakTime] = useState(false);
  const navigate= useNavigate()

  const [token, setToken]= useContext(AuthContext)

  const handleStart = () => {
    setWork(true);
  };

  const handleStop = () => {
    setWork(false);
  };

  const handleRestart = () => {
    setTime(1500);
  };

  const handleLogout=()=>{
    setToken(null)
    localStorage.clear()
    navigate("/")
  }

  useEffect(() => {
    if (!breakTime && work && time > 0) {
      const interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (time === 0 && !breakTime) {
      setTime(300);
      setWork(false);
      setBreakTime(true)
    }
    if (time === 0 && breakTime) {
      setTime(1500);
      setWork(false);
      setBreakTime(false);
    }
    if (breakTime && work && time > 0) {
      const interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [time, work]);

  const min = Math.floor(time / 60);
  const sec = time % 60;

  if(token || localStorage.getItem("tokenCookie")){
  return (
    <div className="home-cont">
      <div className="pomodro-counter-cont">
        <div className="circle">
        <h3 className="status">{breakTime?"5 minutes Break":"Work"}</h3>
          <div>
            <h1 className="time">
              {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
            </h1>
          </div>
          <div className="counter-btn-cont">
            <button className="start" onClick={handleStart}>
              Start
            </button>
            <button className="stop" onClick={handleStop}>
              Stop
            </button>
            <button className="restart" onClick={handleRestart}>
              Restart
            </button>
          </div>
            <div><button className="logout" onClick={handleLogout}>Logout</button></div>
        </div>
      </div>
    </div>
  );
}else{
  return(
    <>
    <Navigate to="/"/>
    </>
  )
}
};

export default Home;
