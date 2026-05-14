import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/layout/Layout'
import Calculator from './pages/Calculator'
import ItemsBrowser from './pages/ItemsBrowser'
import RecipesBrowser from './pages/RecipesBrowser'
import FactoryPlanner from './pages/FactoryPlanner'

export default function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/items" element={<ItemsBrowser />} />
          <Route path="/recipes" element={<RecipesBrowser />} />
          <Route path="/planner" element={<FactoryPlanner />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}
