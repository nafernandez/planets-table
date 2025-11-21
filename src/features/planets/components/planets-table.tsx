"use client"

import { DataTable } from '@/shared/ui/data-table'
import { columns } from './columns'
import { usePlanets } from '../hooks/use-planets'
import { getTotalPopulation } from '../lib/formatters'

export function PlanetsTable() {
  const { planets, loading, error } = usePlanets()

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-destructive">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  if (loading && planets.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Cargando planetas...</p>
      </div>
    )
  }

  const totalPopulation = getTotalPopulation(planets)

  return (
    <div className="space-y-4">
      <DataTable 
        columns={columns} 
        data={planets}
        enablePagination={false}
      />
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground ml-auto">
          Población total: <span className="font-semibold">{totalPopulation}</span>
        </div>
      </div>
    </div>
  )
}
