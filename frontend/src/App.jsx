
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes/index.jsx'  
import Header from './components/Header/Header.jsx'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
