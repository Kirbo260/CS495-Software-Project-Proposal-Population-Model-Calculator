// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes/index.jsx'  
import Base from './routes/Base.jsx'
import Header from './components/Header/Header.jsx'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Base />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
