import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ExponentialGrowth from '../pages/ExponentialGrowthModel'
import PopulationGrowth from '../pages/PopulationGrowthModel'
import Help from '../pages/Help'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import StudentSignup from '../pages/Signup/StudentSignup'
import InstructorSignup from '../pages/Signup/InstructorSignup'
import LogisticGrowthModel from '../pages/LogisticGrowthModel'
import DiscreteGrowth from '../pages/DiscreteGrowthModelPage'
import ModelSelectionPage from '../pages/ModelSelectionPage'
import ForgetPassword from '../pages/ForgetPassword/ForgetPassword'

// Page routing paths for site
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup/student" element={<StudentSignup />} />
      <Route path="/signup/instructor" element={<InstructorSignup />} />
      <Route path="/help" element={<Help />} />
      <Route path="/exponentialgrowth" element={<ExponentialGrowth />} />
      <Route path="/populationgrowth" element={<PopulationGrowth />} />
      <Route path="/logisticgrowth" element={<LogisticGrowthModel />} />
      <Route path="/modelselection" element={<ModelSelectionPage />} />
      <Route path="/discretegrowth" element={<DiscreteGrowth />} />
      {/* Future routes can be added here */}
      </Routes>
  )
}