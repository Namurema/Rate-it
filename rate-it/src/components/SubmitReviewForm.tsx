import { useState } from 'react'
import { supabase } from '../lib/supabase'
import StarRating from './StarRating'

interface SubmitReviewFormProps {
  providerId: string
}

export default function SubmitReviewForm({ providerId }: SubmitReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [reviewerName, setReviewerName] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (rating === 0) {
      setError('Please select a star rating.')
      return
    }
    if (!comment.trim()) {
      setError('Please write a comment.')
      return
    }

    setLoading(true)

    const { error: insertError } = await supabase.from('reviews').insert({
      provider_id: providerId,
      rating,
      comment: comment.trim(),
      reviewer_name: reviewerName.trim() || 'Anonymous',
      status: 'pending',
    })

    setLoading(false)

    if (insertError) {
      setError('Something went wrong. Please try again.')
      return
    }

    setSuccess(true)
    setRating(0)
    setComment('')
    setReviewerName('')
  }

  if (success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
        <div className="text-3xl mb-2">✅</div>
        <p className="font-semibold text-emerald-800 mb-1">Review submitted!</p>
        <p className="text-sm text-emerald-600">Your review is awaiting moderation.</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 text-xs text-emerald-600 hover:text-emerald-800 underline transition-colors"
        >
          Submit another review
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
      <h3 className="text-base font-semibold text-gray-900">Leave a Review</h3>

      {/* Star Rating */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">Your Rating</label>
        <StarRating value={rating} onChange={setRating} size="lg" />
        {rating > 0 && (
          <p className="text-xs text-gray-400 mt-1">
            {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
          </p>
        )}
      </div>

      {/* Comment */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Share your experience..."
          className="w-full px-4 py-3 rounded-xl text-sm bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none transition-all"
        />
      </div>

      {/* Reviewer Name */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">
          Your Name <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          placeholder="Leave blank to post as Anonymous"
          className="w-full px-4 py-3 rounded-xl text-sm bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-100 px-4 py-2 rounded-xl">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  )
}