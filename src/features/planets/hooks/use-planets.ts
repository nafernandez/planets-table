import { useState, useEffect } from 'react'
import { fetchPlanets } from '../api/planets-api'
import type { Planet } from '../types'

export function usePlanets() {
  const [planets, setPlanets] = useState<Planet[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [nextPage, setNextPage] = useState<number | null>(2)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    async function loadInitialPlanets() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchPlanets(1)
        setPlanets(data.results)
        setNextPage(data.next ? 2 : null)
        setHasMore(data.next !== null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    loadInitialPlanets()
  }, [])

  const loadMore = async () => {
    if (!nextPage || loadingMore) return

    try {
      setLoadingMore(true)
      setError(null)
      const data = await fetchPlanets(nextPage)
      setPlanets(prev => [...prev, ...data.results])
      setNextPage(data.next ? nextPage + 1 : null)
      setHasMore(data.next !== null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoadingMore(false)
    }
  }

  return { planets, loading, loadingMore, error, hasMore, loadMore }
}

