import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface AddProviderFormProps {
  onClose?: () => void
}

export default function AddProviderForm({ onClose }: AddProviderFormProps) {
  const [categories, setCategories] = useState<string[]>([])
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from('categories').select('name').order('name')
      if (data) setCategories(data.map((c: { name: string }) => c.name))
    }
    fetchCategories()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!name.trim()) { setError('Provider name is required.'); return }
    if (!category) { setError('Please select a category.'); return }
    if (!location.trim()) { setError('Location is required.'); return }

    setLoading(true)

    const { error: insertError } = await supabase.from('providers').insert({
      name: name.trim(),
      category,
      location: location.trim(),
      description: description.trim(),
      status: 'pending',
    })

    setLoading(false)

    if (insertError) {
      setError('Something went wrong. Please try again.')
      return
    }

    setSuccess(true)
  }

  if (success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3">🎉</div>
        <p className="font-semibold text-emerald-800 mb-1">Provider submitted!</p>
        <p className="text-sm text-emerald-600 mb-5">
          Your submission is under review and will appear once approved.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => { setSuccess(false); setName(''); setCategory(''); setLocation(''); setDescription('') }}
            className="text-sm text-emerald-700 border border-emerald-300 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-colors"
          >
            Add another
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-sm text-white bg-emerald-600 px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Done
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h3 className="text-base font-semibold text-gray-900">Submit a Provider</h3>

      {/* Name */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">Provider Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. City Hospital, Sunrise Restaurant"
          className="w-full px-4 py-3 rounded-xl text-sm bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
        />
      </div>

      {/* Category */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-sm bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Kampala, Nakasero"
          className="w-full px-4 py-3 rounded-xl text-sm bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">
          Description <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Brief description of the provider..."
          className="w-full px-4 py-3 rounded-xl text-sm bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none transition-all"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-100 px-4 py-2 rounded-xl">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          {loading ? 'Submitting...' : 'Submit Provider'}
        </button>
      </div>
    </form>
  )
}