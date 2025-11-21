"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/shared/ui/badge"
import { Checkbox } from "@/shared/ui/checkbox"
import type { Planet } from "../types"
import {
  formatGravity,
  formatDiameter,
  formatPeriod,
  formatPopulation,
  formatSurfaceWater,
} from "../lib/formatters"

const getClimateColor = () => {
  return 'bg-gray-100 text-gray-700 border-gray-200'
}

const getTerrainColor = () => {
  return 'bg-purple-100 text-purple-700 border-purple-200'
}

export const columns: ColumnDef<Planet>[] = [
  {
    id: "select",
    header: ({ table }) => {
      const isAllSelected = table.getIsAllPageRowsSelected()
      const isSomeSelected = table.getIsSomePageRowsSelected()
      
      return (
        <Checkbox
          checked={isAllSelected ? true : isSomeSelected ? "indeterminate" : false}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Seleccionar todo"
        />
      )
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "climate",
    header: "Clima",
    cell: ({ row }) => {
      const climate = row.getValue("climate") as string
      const displayClimate = climate === 'unknown' || !climate
        ? 'Desconocido'
        : climate.split(',').map(c => c.trim())[0]
      
      return (
        <Badge variant="outline" className={getClimateColor()}>
          {displayClimate}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      const climate = row.getValue(id) as string
      return climate.toLowerCase().includes(value.toLowerCase())
    },
  },
  {
    accessorKey: "terrain",
    header: "Terreno",
    cell: ({ row }) => {
      const terrain = row.getValue("terrain") as string
      const isUnknown = terrain === 'unknown' || !terrain
      
      const terrains = isUnknown 
        ? ['Desconocido']
        : terrain.split(',').map(t => t.trim()).filter(t => t)
      
      const displayTerrain = terrains[0]
      const extraCount = terrains.length - 1
      const remainingTerrains = terrains.slice(1)
      
      return (
        <div className="flex items-center gap-1">
          <Badge variant="outline" className={getTerrainColor()}>
            {displayTerrain}
          </Badge>
          {extraCount > 0 && (
            <div className="relative group">
              <Badge variant="outline" className={getTerrainColor()}>
                +{extraCount}
              </Badge>
              <div className="absolute left-0 -top-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white border border-purple-200 rounded-md shadow-lg p-2 flex flex-wrap gap-1 min-w-max max-w-xs">
                  {remainingTerrains.map((t, index) => (
                    <Badge key={index} variant="outline" className={getTerrainColor()}>
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      const terrain = row.getValue(id) as string
      return terrain.toLowerCase().includes(value.toLowerCase())
    },
  },
  {
    accessorKey: "gravity",
    header: "Gravedad",
    cell: ({ row }) => {
      const gravity = row.original.gravity
      return formatGravity(gravity)
    },
  },
  {
    accessorKey: "diameter",
    header: "Diámetro (km)",
    cell: ({ row }) => {
      const diameter = row.original.diameter
      return formatDiameter(diameter)
    },
  },
  {
    accessorKey: "rotation_period",
    header: "Período de rotación",
    cell: ({ row }) => {
      const rotationPeriod = row.original.rotation_period
      return formatPeriod(rotationPeriod)
    },
  },
  {
    accessorKey: "orbital_period",
    header: "Período de órbita",
    cell: ({ row }) => {
      const orbitalPeriod = row.original.orbital_period
      return formatPeriod(orbitalPeriod)
    },
  },
  {
    accessorKey: "surface_water",
    header: "Agua superficial",
    cell: ({ row }) => {
      const surfaceWater = row.original.surface_water
      const formatted = formatSurfaceWater(surfaceWater)
      
      return formatted === 'No' ? (
        <Badge variant="destructive">{formatted}</Badge>
      ) : (
        <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
          {formatted}
        </Badge>
      )
    },
  },
  {
    accessorKey: "population",
    header: "Población",
    cell: ({ row }) => {
      const population = row.original.population
      return formatPopulation(population)
    },
  },
  {
    accessorKey: "residents",
    header: "Residentes",
    cell: ({ row }) => {
      const residents = row.original.residents
      return residents.length
    },
  },
  {
    accessorKey: "films",
    header: "Películas",
    cell: ({ row }) => {
      const films = row.original.films
      return films.length
    },
  },
]

