"use client"

import { DataTable } from '@/shared/ui/data-table'
import { Button } from '@/shared/ui/button'
import { RotateCw } from 'lucide-react'
import { columns } from './columns'
import { usePlanets } from '../hooks/use-planets'
import { getTotalPopulation } from '../lib/formatters'

export function PlanetsTable() {
  const { planets, loading, loadingMore, error, hasMore, loadMore } = usePlanets()

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
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-0">
        <DataTable 
          columns={columns} 
          data={planets}
          enablePagination={false}
        />
      </div>
      
      <div className="flex-shrink-0 flex flex-col items-center gap-4 pt-4">
        {hasMore && (
          <Button
            onClick={loadMore}
            disabled={loadingMore}
            className="h-9 gap-2 bg-white border border-[#D0D8E9] hover:bg-gray-50 rounded-full px-4 py-2 shadow-[0_1px_2px_0_rgba(34,40,58,0.05)]"
          >
            <RotateCw  className={`h-4 w-4 text-black ${loadingMore ? 'animate-spin' : ''}`} />
            <span className="rotate-cw-label">Cargar más</span>
          </Button>
        )}
        
        <div className="flex items-center justify-end w-full">
          <div className="text-sm text-muted-foreground">
            Población total: <span className="font-semibold">{totalPopulation}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
