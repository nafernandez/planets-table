"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type {
  ColumnDef,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  renderFooter?: () => React.ReactNode
}

export function DataTable<TData, TValue>({
  columns,
  data,
  renderFooter,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState<Record<string, boolean>>({})
  const prevDataLengthRef = React.useRef<number>(0)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getRowId: (row, index) => {
      if (row && typeof row === 'object' && 'url' in row) {
        return (row as { url: string }).url
      }
      return String(index)
    },
    state: {
      rowSelection,
    },
  })
  React.useEffect(() => {
    const currentDataLength = data.length
    const prevDataLength = prevDataLengthRef.current
    if (currentDataLength > prevDataLength && prevDataLength > 0) {
      const rows = table.getRowModel().rows
      const previousRows = rows.slice(0, prevDataLength)
      const allPreviousSelected = previousRows.length > 0 && previousRows.every((row) => rowSelection[row.id] === true)

      if (allPreviousSelected) {
        const newSelection: Record<string, boolean> = { ...rowSelection }
        const newRows = rows.slice(prevDataLength)
        
        newRows.forEach((row) => {
          newSelection[row.id] = true
        })
        
        setRowSelection(newSelection)
      }
    }

    prevDataLengthRef.current = currentDataLength
  }, [data])

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader key={`header-${Object.keys(rowSelection).length}-${data.length}`}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-white">
                {headerGroup.headers.map((header) => {
                  const isRightAligned = (header.column.columnDef.meta as { rightAlign?: boolean })?.rightAlign
                  const columnSize = header.column.getSize()
                  const minSize = (header.column.columnDef as { minSize?: number }).minSize || columnSize || 100
                  return (
                    <TableHead 
                      key={header.id} 
                      className={isRightAligned ? "bg-white !pr-2" : "bg-white"}
                      style={columnSize ? { 
                        width: `${columnSize}px`, 
                        maxWidth: `${columnSize}px`,
                        minWidth: `${minSize}px`
                      } : { minWidth: `${minSize}px` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isRightAligned = (cell.column.columnDef.meta as { rightAlign?: boolean })?.rightAlign
                    const columnSize = cell.column.getSize()
                    const minSize = (cell.column.columnDef as { minSize?: number }).minSize || columnSize || 100
                    return (
                      <TableCell 
                        key={cell.id} 
                        className={isRightAligned ? "!pr-2" : ""}
                        style={columnSize ? { 
                          width: `${columnSize}px`, 
                          maxWidth: `${columnSize}px`,
                          minWidth: `${minSize}px`
                        } : { minWidth: `${minSize}px` }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {renderFooter && (
          <div className="flex-shrink-0 flex flex-col items-center gap-4 pt-4 pb-4">
            {renderFooter()}
          </div>
        )}
      </div>
    </div>
  )
}

