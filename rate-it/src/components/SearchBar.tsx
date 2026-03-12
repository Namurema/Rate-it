import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { supabase } from '../lib/supabase'
import useAppStore from '../store/useAppStore'

interface Provider {
  id: string
  name: string
  category: string
  location: string
  description: string
  avg_rating: number
  review_count?: number
}

interface SearchBarProps {
  onResults: (results: Provider[] | null) => void
  onLoading: (loading: boolean) => void
}

export default function SearchBar({ onResults, onLoading }: SearchBarProps) {
  const { searchQuery, setSearchQuery } = useAppStore()
  const [localQuery, setLocalQuery] = useState(searchQuery)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = localQuery.trim()

    if (!trimmed) {
      onResults(null)
      setSearchQuery('')
      return
    }

    setSearchQuery(trimmed)
    onLoading(true)

    const { data, error } = await supabase.rpc('search_providers', {
      search_term: trimmed,
    })

    if (error) {
      console.error('Search error:', error)
      onResults([])
    } else {
      onResults(data ?? [])
    }

    onLoading(false)
  }

  function handleClear() {
    setLocalQuery('')
    setSearchQuery('')
    onResults(null)
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-2xl mx-auto">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Search restaurants, hospitals, schools..."
          className="w-full pl-11 pr-10 py-3.5 rounded-xl text-sm bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
        />
        {localQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
      >
        Search
      </button>
    </form>
  )
}