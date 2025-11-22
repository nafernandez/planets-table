"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type {
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
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
  enablePagination?: boolean
  pageSize?: number
  renderFooter?: () => React.ReactNode
  onScrollContainerRef?: (ref: HTMLDivElement | null) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  enablePagination = true,
  pageSize = 10,
  renderFooter,
  onScrollContainerRef,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (onScrollContainerRef) {
      onScrollContainerRef(scrollContainerRef.current)
    }
  }, [onScrollContainerRef])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableColumnResizing: false,
    columnResizeMode: 'onChange',
    initialState: {
      pagination: {
        pageSize,
      },
    },
    state: {
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="h-full flex flex-col">
      <div ref={scrollContainerRef} className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-white">
                {headerGroup.headers.map((header) => {
                  const isRightAligned = (header.column.columnDef.meta as { rightAlign?: boolean })?.rightAlign
                  const columnSize = header.column.getSize()
                  return (
                    <TableHead 
                      key={header.id} 
                      className={isRightAligned ? "bg-white !pr-2" : "bg-white"}
                      style={columnSize ? { width: `${columnSize}px`, maxWidth: `${columnSize}px` } : undefined}
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
                    return (
                      <TableCell 
                        key={cell.id} 
                        className={isRightAligned ? "!pr-2" : ""}
                        style={columnSize ? { width: `${columnSize}px`, maxWidth: `${columnSize}px` } : undefined}
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

