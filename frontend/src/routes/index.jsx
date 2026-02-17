import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ExponentialGrowth from '../pages/ExponentialGrowthModel'
import PopulationGrowth from '../pages/PopulationGrowthModel'

// Page routing paths for site
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/exponentialgrowth" element={<ExponentialGrowth />} />
      <Route path="/populationgrowth" element={<PopulationGrowth />} />
      {/* Future routes can be added here */}
      </Routes>
  )
}