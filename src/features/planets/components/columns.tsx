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
  return 'bg-[#F8F9FB] text[#22283A] border-[#D0D8E9]'
}

const getTerrainColor = () => {
  return 'bg-[#F3EBFF] text-[#873AFF] border-[#FFFFFF00]'
}

export const columns: ColumnDef<Planet>[] = [
  {
    id: "select",
    size: 50,
    header: ({ table }) => {
      const isAllSelected = table.getIsAllPageRowsSelected()
      const isSomeSelected = table.getIsSomePageRowsSelected()
      
      return (
        <div className="pl-4">
          <Checkbox
            checked={isAllSelected ? true : isSomeSelected ? "indeterminate" : false}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Seleccionar todo"
            className="data-[state=checked]:bg-[#873aff] data-[state=checked]:border-[#873aff] data-[state=checked]:text-white data-[state=indeterminate]:bg-[#873aff] data-[state=indeterminate]:border-[#873aff] data-[state=indeterminate]:text-white"
          />
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="pl-4">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Seleccionar fila"
          className="data-[state=checked]:bg-[#873aff] data-[state=checked]:border-[#873aff] data-[state=checked]:text-white"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left ">Nombre</div>,
    cell: ({ row }) => (
      <div className="text-left text-[#22283A]">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "climate",
    header: () => <div className="text-left">Clima</div>,
    cell: ({ row }) => {
      const climate = row.getValue("climate") as string
      const displayClimate = climate === 'unknown' || !climate
        ? 'Desconocido'
        : climate.split(',').map(c => c.trim())[0]
      
      return (
        <div className="text-left">
          <Badge variant="outline" className={getClimateColor()}>
            {displayClimate}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      const climate = row.getValue(id) as string
      return climate.toLowerCase().includes(value.toLowerCase())
    },
  },
  {
    accessorKey: "terrain",
    size: 110,
    header: () => <div className="text-left">Terreno</div>,
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
        <div className="flex items-center gap-1 text-left">
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
    meta: { rightAlign: true },
    header: () => <div className="text-right">Gravedad</div>,
    cell: ({ row }) => {
      const gravity = row.original.gravity
      return <div className="text-right text-[#697086]">{formatGravity(gravity)}</div>
    },
  },
  {
    accessorKey: "diameter",
    meta: { rightAlign: true },
    header: () => <div className="text-right">Diámetro (km)</div>,
    cell: ({ row }) => {
      const diameter = row.original.diameter
      return <div className="text-right text-[#697086]">{formatDiameter(diameter)}</div>
    },
  },
  {
    accessorKey: "rotation_period",
    meta: { rightAlign: true },
    header: () => <div className="text-right">Período de rotación</div>,
    cell: ({ row }) => {
      const rotationPeriod = row.original.rotation_period
      return <div className="text-right text-[#697086]">{formatPeriod(rotationPeriod)}</div>
    },
  },
  {
    accessorKey: "orbital_period",
    meta: { rightAlign: true },
    header: () => <div className="text-right">Período de órbita</div>,
    cell: ({ row }) => {
      const orbitalPeriod = row.original.orbital_period
      return <div className="text-right text-[#697086]">{formatPeriod(orbitalPeriod)}</div>
    },
  },
  {
    accessorKey: "surface_water",
    size: 110,
    header: () => <div className="text-left">Agua superficial</div>,
    cell: ({ row }) => {
      const surfaceWater = row.original.surface_water
      const formatted = formatSurfaceWater(surfaceWater)
      
      return (
        <div className="text-left">
          {formatted === 'No' ? (
            <Badge variant="destructive">{formatted}</Badge>
          ) : (
            <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
              {formatted}
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "population",
    meta: { rightAlign: true },
    header: () => <div className="text-right">Población</div>,
    cell: ({ row }) => {
      const population = row.original.population
      return <div className="text-right text-[#697086]">{formatPopulation(population)}</div>
    },
  },
  {
    accessorKey: "residents",
    meta: { rightAlign: true },
    header: () => <div className="text-right">Residentes</div>,
    cell: ({ row }) => {
      const residents = row.original.residents
      return <div className="text-right text-[#697086]">{residents.length}</div>
    },
  },
  {
    accessorKey: "films",
    meta: { rightAlign: true },
    header: () => <div className="text-right">Películas</div>,
    cell: ({ row }) => {
      const films = row.original.films
      return <div className="text-right text-[#697086]">{films.length}</div>
    },
  },
]

