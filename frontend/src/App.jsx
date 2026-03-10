
import { useLocation } from "react-router-dom";
import AppRoutes from './routes/index.jsx'
import Header from './components/Header/Header.jsx'
import './App.css'

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/signup", "/signup/student", "/signup/instructor", "/forget-password"]

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <AppRoutes />
    </>
  )
}

export default App
