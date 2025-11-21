import { useState, useEffect } from 'react'
import { fetchAllPlanets } from '../api/planets-api'
import type { Planet } from '../types'

export function usePlanets() {
  const [planets, setPlanets] = useState<Planet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPlanets() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchAllPlanets()
        setPlanets(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    loadPlanets()
  }, [])

  return { planets, loading, error }
}

