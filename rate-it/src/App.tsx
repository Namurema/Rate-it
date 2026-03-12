import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProviderDetailPage from './pages/ProviderDetailPage'
import AdminPage from './pages/AdminPage'

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-sm">Page not found</p>
        <a href="/" className="text-orange-500 text-sm mt-4 inline-block hover:underline">
          Go home
        </a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/provider/:id" element={<ProviderDetailPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}