
import { useLocation } from "react-router-dom";
import AppRoutes from './routes/index.jsx'
import Header from './components/Header/Header.jsx'
import './App.css'

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && <Header />}
      <AppRoutes />
    </>
  )
}

export default App
