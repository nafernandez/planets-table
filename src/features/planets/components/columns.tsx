"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/shared/ui/badge"
import { Checkbox } from "@/shared/ui/checkbox"
import type { Planet } from "../index"
import {
  formatGravity,
  formatDiameter,
  formatRotationPeriod,
  formatOrbitalPeriod,
  formatPopulation,
  formatSurfaceWater,
} from "../lib/formatters"
import { translateClimate, translateTerrain } from "../lib/translations"


export const columns: ColumnDef<Planet>[] = [
  {
    id: "select",
    size: 50,
    minSize: 50,
    header: ({ table }) => {
      const isAllSelected = table.getIsAllRowsSelected()
      const isSomeSelected = table.getIsSomeRowsSelected()
      
      return (
        <div className="pl-4">
          <Checkbox
            checked={
              isAllSelected || (isSomeSelected && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
            aria-label="Seleccionar todo"
            className="data-[state=checked]:bg-[#873aff] data-[state=checked]:border-[#873aff] data-[state=checked]:text-white data-[state=indeterminate]:bg-[#E8D5FF] data-[state=indeterminate]:border-[#873aff] data-[state=indeterminate]:text-[#873aff]"
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
    size: 150,
    minSize: 120,
    header: () => <div className="text-left">Nombre</div>,
    cell: ({ row }) => (
      <div className="text-left text-[#22283A]">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "climate",
    size: 140,
    minSize: 120,
    header: () => <div className="text-left">Clima</div>,
    cell: ({ row }) => {
      const climate = row.getValue("climate") as string
      const isUnknown = climate === 'unknown' || !climate
      
      if (isUnknown) {
        return (
          <div className="text-left">
            <span className="text-[#697086]">-</span>
          </div>
        )
      }
      
      const climates = climate.split(',').map(c => c.trim()).filter(c => c)
      const displayClimate = translateClimate(climates[0])
      const extraCount = climates.length - 1
      const remainingClimates = climates.slice(1).map(c => translateClimate(c))
      
      return (
        <div className="flex items-center gap-1 text-left">
          <Badge variant="default">
            {displayClimate}
          </Badge>
          {extraCount > 0 && (
            <div className="relative group">
              <Badge variant="default">
                +{extraCount}
              </Badge>
              <div className="absolute left-0 -top-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white border-r border-[#D0D8E9] rounded-md p-2 flex flex-wrap gap-1 min-w-max max-w-xs">
                  {remainingClimates.map((c, index) => (
                    <Badge key={index} variant="default">
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "terrain",
    size: 160,
    minSize: 140,
    header: () => <div className="text-left">Terreno</div>,
    cell: ({ row }) => {
      const terrain = row.getValue("terrain") as string
      const isUnknown = terrain === 'unknown' || !terrain
      
      if (isUnknown) {
        return (
          <div className="text-left">
            <span className="text-[#697086]">-</span>
          </div>
        )
      }
      
      const terrains = terrain.split(',').map(t => t.trim()).filter(t => t)
      const displayTerrain = translateTerrain(terrains[0])
      const extraCount = terrains.length - 1
      const remainingTerrains = terrains.slice(1).map(t => translateTerrain(t))
      
      return (
        <div className="flex items-center gap-1 text-left">
          <Badge variant="terrain">
            {displayTerrain}
          </Badge>
          {extraCount > 0 && (
            <div className="relative group">
              <Badge variant="terrain">
                +{extraCount}
              </Badge>
              <div className="absolute left-0 -top-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white border-r border-purple-200 rounded-md p-2 flex flex-wrap gap-1 min-w-max max-w-xs">
                  {remainingTerrains.map((t, index) => (
                    <Badge key={index} variant="terrain">
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
  },
  {
    accessorKey: "gravity",
    size: 120,
    minSize: 100,
    meta: { rightAlign: true },
    header: () => <div className="text-right">Gravedad</div>,
    cell: ({ row }) => {
      const gravity = row.original.gravity
      return <div className="text-right text-[#697086]">{formatGravity(gravity)}</div>
    },
  },
  {
    accessorKey: "diameter",
    size: 140,
    minSize: 120,
    meta: { rightAlign: true },
    header: () => <div className="text-right">Diámetro (km)</div>,
    cell: ({ row }) => {
      const diameter = row.original.diameter
      return <div className="text-right text-[#697086]">{formatDiameter(diameter)}</div>
    },
  },
  {
    accessorKey: "rotation_period",
    size: 160,
    minSize: 140,
    meta: { rightAlign: true },
    header: () => <div className="text-right">Período de rotación</div>,
    cell: ({ row }) => {
      const rotationPeriod = row.original.rotation_period
      return <div className="text-right text-[#697086]">{formatRotationPeriod(rotationPeriod)}</div>
    },
  },
  {
    accessorKey: "orbital_period",
    size: 160,
    minSize: 140,
    meta: { rightAlign: true },
    header: () => <div className="text-right">Período de órbita</div>,
    cell: ({ row }) => {
      const orbitalPeriod = row.original.orbital_period
      return <div className="text-right text-[#697086]">{formatOrbitalPeriod(orbitalPeriod)}</div>
    },
  },
  {
    accessorKey: "surface_water",
    size: 150,
    minSize: 130,
    header: () => <div className="text-left">Agua superficial</div>,
    cell: ({ row }) => {
      const surfaceWater = row.original.surface_water
      const formatted = formatSurfaceWater(surfaceWater)
      
      if (formatted === '-') {
        return (
          <div className="text-left">
            <span className="text-[#697086]">-</span>
          </div>
        )
      }
      
      return (
        <div className="text-left">
          {formatted === 'No' ? (
            <Badge variant="destructive">{formatted}</Badge>
          ) : (
            <Badge variant="default">
              {formatted}
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "population",
    size: 140,
    minSize: 120,
    meta: { rightAlign: true },
    header: () => <div className="text-right">Población</div>,
    cell: ({ row }) => {
      const population = row.original.population
      return <div className="text-right text-[#697086]">{formatPopulation(population)}</div>
    },
  },
  {
    accessorKey: "residents",
    size: 120,
    minSize: 100,
    meta: { rightAlign: true },
    header: () => <div className="text-right">Residentes</div>,
    cell: ({ row }) => {
      const residents = row.original.residents
      return <div className="text-right text-[#697086]">{residents.length}</div>
    },
  },
  {
    accessorKey: "films",
    size: 120,
    minSize: 100,
    meta: { rightAlign: true },
    header: () => <div className="text-right">Películas</div>,
    cell: ({ row }) => {
      const films = row.original.films
      return <div className="text-right text-[#697086]">{films.length}</div>
    },
  },
]

