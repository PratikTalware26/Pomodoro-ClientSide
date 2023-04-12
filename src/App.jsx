import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Components/Register'
import SignIn from './Components/SignIn'
import Home from './Components/Home'
import { useState } from 'react'
import AuthContext from './Components/context'

function App() {
  const [token, setToken]= useState(null)

  return (
    <div className="App">
      <AuthContext.Provider value={[token, setToken]}>
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
      </BrowserRouter>
      </AuthContext.Provider>
    </div>
  )
}

export default App
