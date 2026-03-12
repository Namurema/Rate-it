import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import AddProviderForm from '../components/AddProviderForm'

export default function AddProviderPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAV */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white border-b border-gray-200">
        <span className="text-2xl font-bold tracking-tight">
          Rate<span className="text-orange-500">.it</span>
        </span>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </nav>

      <div className="max-w-lg mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Add a Provider</h1>
          <p className="text-sm text-gray-500">
            Know a business or service worth rating? Submit it for review.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-7">
          <AddProviderForm onClose={() => navigate('/')} />
        </div>
      </div>

      <footer className="text-center py-8 text-xs text-gray-400 border-t border-gray-200 bg-white mt-12">
        © {new Date().getFullYear()} Rate.it — Honest reviews, real accountability.
      </footer>
    </div>
  )
}