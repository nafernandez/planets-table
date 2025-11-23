"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { Table } from "@tanstack/react-table"
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

const STYLES = {
  checkbox: {
    checked: "data-[state=checked]:bg-[#873aff] data-[state=checked]:border-[#873aff] data-[state=checked]:text-white",
    indeterminate: "data-[state=indeterminate]:bg-[#E8D5FF] data-[state=indeterminate]:border-[#873aff] data-[state=indeterminate]:text-[#873aff]",
  },
  text: {
    primary: "text-[#22283A]",
    secondary: "text-[#697086]",
  },
  tooltip: {
    base: "absolute left-0 -top-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto",
    container: "bg-white border-r rounded-md p-2 flex flex-wrap gap-1 min-w-max max-w-xs",
    border: {
      default: "border-[#D0D8E9]",
      terrain: "border-purple-200",
    },
  },
} as const

const isUnknownValue = (value: string | null | undefined): boolean => {
  return value === 'unknown' || !value
}

const parseCommaSeparated = (value: string): string[] => {
  return value.split(',').map(item => item.trim()).filter(Boolean)
}

const renderUnknownValue = () => (
  <div className="text-left">
    <span className={STYLES.text.secondary}>-</span>
  </div>
)

const renderNumericCell = (value: string | number) => (
  <div className={`text-right ${STYLES.text.secondary}`}>{value}</div>
)

interface BadgeListCellProps {
  items: string[]
  variant: "default" | "terrain"
  translateFn: (item: string) => string
  borderColor?: string
}

const renderBadgeListCell = ({ 
  items, 
  variant, 
  translateFn, 
  borderColor = STYLES.tooltip.border.default 
}: BadgeListCellProps) => {
  if (items.length === 0) {
    return renderUnknownValue()
  }

  const translatedItems = items.map(translateFn)
  const [displayItem, ...remainingItems] = translatedItems
  const extraCount = remainingItems.length

  return (
    <div className="flex items-center gap-1 text-left">
      <Badge variant={variant}>{displayItem}</Badge>
      {extraCount > 0 && (
        <div className="relative group">
          <Badge variant={variant}>+{extraCount}</Badge>
          <div className={STYLES.tooltip.base}>
            <div className={`${STYLES.tooltip.container} ${borderColor}`}>
              {remainingItems.map((item, index) => (
                <Badge key={index} variant={variant}>
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const renderSurfaceWaterCell = (value: string) => {
  const formatted = formatSurfaceWater(value)
  
  if (formatted === '-') {
    return renderUnknownValue()
  }
  
  const variant = formatted === 'No' ? "destructive" : "default"
  
  return (
    <div className="text-left">
      <Badge variant={variant}>{formatted}</Badge>
    </div>
  )
}

interface ColumnSize {
  size: number
  minSize: number
}

const createSelectColumn = (): ColumnDef<Planet> => ({
  id: "select",
  size: 50,
  minSize: 50,
  header: ({ table }: { table: Table<Planet> }) => {
    const isAllSelected = table.getIsAllRowsSelected()
    const isSomeSelected = table.getIsSomeRowsSelected()
    
    return (
      <div className="pl-4">
        <Checkbox
          checked={isAllSelected || (isSomeSelected && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
          aria-label="Seleccionar todo"
          className={`${STYLES.checkbox.checked} ${STYLES.checkbox.indeterminate}`}
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
        className={STYLES.checkbox.checked}
      />
    </div>
  ),
  enableSorting: false,
  enableHiding: false,
})

const createTextColumn = (
  accessorKey: keyof Planet,
  header: string,
  { size, minSize }: ColumnSize
): ColumnDef<Planet> => ({
  accessorKey,
  size,
  minSize,
  header: () => <div className="text-left">{header}</div>,
  cell: ({ row }) => (
    <div className={`text-left ${STYLES.text.primary}`}>
      {row.getValue(accessorKey) as string}
    </div>
  ),
})

const createNumericColumn = (
  accessorKey: keyof Planet,
  header: string,
  formatter: (value: string) => string,
  { size, minSize }: ColumnSize
): ColumnDef<Planet> => ({
  accessorKey,
  size,
  minSize,
  meta: { rightAlign: true },
  header: () => <div className="text-right">{header}</div>,
  cell: ({ row }) => (
    renderNumericCell(formatter(row.original[accessorKey] as string))
  ),
})

const createArrayLengthColumn = (
  accessorKey: keyof Planet,
  header: string,
  { size, minSize }: ColumnSize
): ColumnDef<Planet> => ({
  accessorKey,
  size,
  minSize,
  meta: { rightAlign: true },
  header: () => <div className="text-right">{header}</div>,
  cell: ({ row }) => (
    renderNumericCell((row.original[accessorKey] as string[]).length)
  ),
})

const createBadgeListColumn = (
  accessorKey: keyof Planet,
  header: string,
  variant: "default" | "terrain",
  translateFn: (item: string) => string,
  { size, minSize }: ColumnSize,
  borderColor?: string
): ColumnDef<Planet> => ({
  accessorKey,
  size,
  minSize,
  header: () => <div className="text-left">{header}</div>,
  cell: ({ row }) => {
    const value = row.getValue(accessorKey) as string
    
    if (isUnknownValue(value)) {
      return renderUnknownValue()
    }
    
    const items = parseCommaSeparated(value)
    return renderBadgeListCell({ 
      items, 
      variant, 
      translateFn, 
      borderColor 
    })
  },
})

const createSurfaceWaterColumn = ({ size, minSize }: ColumnSize): ColumnDef<Planet> => ({
  accessorKey: "surface_water",
  size,
  minSize,
  header: () => <div className="text-left">Agua superficial</div>,
  cell: ({ row }) => renderSurfaceWaterCell(row.original.surface_water),
})

// ============================================================================
// Definición de columnas
// ============================================================================
export const columns: ColumnDef<Planet>[] = [
  createSelectColumn(),
  
  createTextColumn("name", "Nombre", { size: 150, minSize: 120 }),
  
  createBadgeListColumn(
    "climate", 
    "Clima", 
    "default", 
    translateClimate, 
    { size: 140, minSize: 120 }
  ),
  
  createBadgeListColumn(
    "terrain", 
    "Terreno", 
    "terrain", 
    translateTerrain, 
    { size: 160, minSize: 140 },
    STYLES.tooltip.border.terrain
  ),
  
  createNumericColumn("gravity", "Gravedad", formatGravity, { size: 120, minSize: 100 }),
  createNumericColumn("diameter", "Diámetro (km)", formatDiameter, { size: 140, minSize: 120 }),
  createNumericColumn("rotation_period", "Período de rotación", formatRotationPeriod, { size: 160, minSize: 140 }),
  createNumericColumn("orbital_period", "Período de órbita", formatOrbitalPeriod, { size: 160, minSize: 140 }),
  
  createSurfaceWaterColumn({ size: 150, minSize: 130 }),
  
  createNumericColumn("population", "Población", formatPopulation, { size: 140, minSize: 120 }),
  createArrayLengthColumn("residents", "Residentes", { size: 120, minSize: 100 }),
  createArrayLengthColumn("films", "Películas", { size: 120, minSize: 100 }),
]

