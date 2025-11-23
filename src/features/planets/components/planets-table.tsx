"use client"

import { DataTable } from '@/shared/ui/data-table'
import { Button } from '@/shared/ui/button'
import { RotateCw } from 'lucide-react'
import { columns } from './columns'
import { usePlanets } from '../index'
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

  const totalPopulation = getTotalPopulation(planets)
  const isLoading = loading || loadingMore

  const handleLoadMore = () => {
    loadMore()
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-0">
        <DataTable 
          columns={columns} 
          data={planets}
          renderFooter={() => (
            <>
              {hasMore && (
                <Button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="h-9 gap-2 bg-white border border-[#D0D8E9] hover:bg-[#ECF0F6] rounded-full px-4 py-2 shadow-[0_1px_2px_0_rgba(34,40,58,0.05)]"
                >
                  <RotateCw  className={`h-4 w-4 text-black ${isLoading ? 'animate-spin' : ''}`} />
                  <span className="lota-alt1-thin text-[#697086]">Cargar más</span>
                </Button>
              )}
            </>
          )}
        />
      </div>
      
      {!loading && (
        <div className="flex-shrink-0 flex items-center justify-end w-full py-4 pr-4 shadow-[0_-4px_16px_0px_rgba(34,40,58,0.15)]">
          <div className="text-sm text-muted-foreground">
          POBLACIÓN ACTUAL DE LOS PLANETAS: <span className="font-semibold">{totalPopulation}</span>
          </div>
        </div>
      )}
    </div>
  )
}
