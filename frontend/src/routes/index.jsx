import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import PopulationGrowth from '../pages/PopulationGrowthModel'
import Help from '../pages/Help'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import StudentSignup from '../pages/Signup/StudentSignup'
import InstructorSignup from '../pages/Signup/InstructorSignup'
import LogisticGrowthModel from '../pages/LogisticGrowthModel'
import DiscreteGrowth from '../pages/DiscreteGrowthModelPage'
import PredatorPrey from '../pages/PredatorPrey'
import EMComparison from '../pages/EMComparison'
import ModelsPage from '../pages/ModelsPage/ModelsPage'
import ModelSelectionPage from '../pages/ModelSelectionPage'
import ForgetPassword from '../pages/ForgetPassword/ForgetPassword'
import DesignModels from '../pages/DesignModels/DesignModels'
import ExponentialGrowthModel from '../pages/ExponentialGrowthModel/ExponentialGrowthModel'
import ContinuousGrowthModel from '../pages/ContinuousGrowthModel'
import StudentSettings from '../pages/StudentSettings/StudentSettings'
import GetStarted from '../pages/GetStarted/GetStarted'
import ResetPassword from '../pages/ForgetPassword/ResetPassword'
import ModelsRestore from '../pages/ModelsPage/ModelsRestore'
import SharingData from '../pages/SharingData/SharingData'


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
      <Route path="/populationgrowth" element={<PopulationGrowth />} />

      <Route path="/logisticgrowth" element={<LogisticGrowthModel />} />
      <Route path="/logisticgrowth/:id" element={<LogisticGrowthModel />} />

      <Route path="/modelselection" element={<ModelSelectionPage />} />

      <Route path="/discretegrowth" element={<DiscreteGrowth />} />
      <Route path="/discretegrowth/:id" element={<DiscreteGrowth />} />

      <Route path="/predatorprey" element={<PredatorPrey />} />
      <Route path="/emcomparison" element={<EMComparison />} />
      <Route path="/models" element={<ModelsPage />} />
      <Route path="/design-models" element={<DesignModels />} />
      <Route path="/design-models/exponential-growth-model" element={<ExponentialGrowthModel/>} />

      <Route path="/continuousgrowth" element={<ContinuousGrowthModel />} />
      <Route path="/continuousgrowth/:id" element={<ContinuousGrowthModel />} />

      <Route path="/studentsettings" element={<StudentSettings />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/reset-password/:token" element={<ResetPassword/>} />
      <Route path="/deletedModels" element={<ModelsRestore/>} />
      <Route path="/sharing-data" element={<SharingData />} />
      {/* Future routes can be added here */}
      </Routes>
  )
}