import { useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import StarRating from './StarRating'

export interface Provider {
  id: string
  name: string
  category: string
  location: string
  description: string
  avg_rating: number
  review_count?: number
}

const categoryColors: Record<string, string> = {
  Restaurant: 'bg-orange-50 text-orange-600',
  Hospital: 'bg-red-50 text-red-600',
  School: 'bg-blue-50 text-blue-600',
  Bank: 'bg-emerald-50 text-emerald-700',
  Hotel: 'bg-purple-50 text-purple-600',
  Pharmacy: 'bg-teal-50 text-teal-600',
  Salon: 'bg-pink-50 text-pink-600',
  Supermarket: 'bg-yellow-50 text-yellow-700',
}

interface ProviderCardProps {
  provider: Provider
  rank?: number
}

export default function ProviderCard({ provider, rank }: ProviderCardProps) {
  const navigate = useNavigate()
  const badgeColor = categoryColors[provider.category] ?? 'bg-gray-100 text-gray-600'

  return (
    <div
      onClick={() => navigate(`/provider/${provider.id}`)}
      className="group bg-white border border-gray-100 rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg hover:border-orange-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-base leading-snug truncate group-hover:text-orange-500 transition-colors">
            {provider.name}
          </h3>
          <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${badgeColor}`}>
            {provider.category}
          </span>
        </div>
        {rank !== undefined && rank < 3 && (
          <span className="ml-2 text-xs font-bold px-2 py-1 rounded-lg bg-orange-50 text-orange-500 shrink-0">
            #{rank + 1}
          </span>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-3">
        <StarRating value={provider.avg_rating} />
        <span className="text-sm font-semibold text-gray-800">
          {provider.avg_rating > 0 ? provider.avg_rating.toFixed(1) : '—'}
        </span>
        {provider.review_count !== undefined && (
          <span className="text-xs text-gray-400">
            ({provider.review_count} {provider.review_count === 1 ? 'review' : 'reviews'})
          </span>
        )}
      </div>

      {/* Location */}
      {provider.location && (
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{provider.location}</span>
        </div>
      )}

      {/* Description */}
      {provider.description && (
        <p className="text-xs text-gray-500 line-clamp-2 mt-1">
          {provider.description}
        </p>
      )}
    </div>
  )
}