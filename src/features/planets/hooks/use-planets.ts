import { useState, useEffect, useCallback } from 'react'
import { fetchPlanets } from '../api/planets-api'
import type { Planet, PlanetsResponse } from '../index'

export function usePlanets() {
  const [planets, setPlanets] = useState<Planet[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [nextPage, setNextPage] = useState<number | null>()
  const [hasMore, setHasMore] = useState(true)

  const handleError = useCallback((err: unknown) => {
    setError(err instanceof Error ? err.message : 'Error desconocido')
  }, [])

  const updatePaginationState = useCallback((data: PlanetsResponse, currentPage: number) => {
    setNextPage(data.next ? currentPage + 1 : null)
    setHasMore(data.next !== null)
  }, [])

  const loadPlanets = useCallback(async (page: number = 1, append: boolean = false) => {
    try {
      setError(null)
      const data = await fetchPlanets(page)
      
      if (append) {
        setPlanets(prev => [...prev, ...data.results])
      } else {
        setPlanets(data.results)
      }
      
      updatePaginationState(data, page)
      return data
    } catch (err) {
      handleError(err)
      throw err
    }
  }, [handleError, updatePaginationState])

  useEffect(() => {
    async function loadInitialPlanets() {
      try {
        setLoading(true)
        await loadPlanets()
      } finally {
        setLoading(false)
      }
    }

    loadInitialPlanets()
  }, [loadPlanets])

  const loadMore = async () => {
    if (!nextPage || loadingMore) return

    try {
      setLoadingMore(true)
      await loadPlanets(nextPage, true)
    } finally {
      setLoadingMore(false)
    }
  }

  return { planets, loading, loadingMore, error, hasMore, loadMore }
}

