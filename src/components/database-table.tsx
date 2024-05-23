"use client"
//This table was built following the tutorial and examples from: https://ui.shadcn.com/docs/components/data-table
//The code from here is considered free use for public or private purposes
//It has been extensively modified with our custom implementations & specific needs, and such we consider it to be effectively of our own work.

//prequisites to run
import { Button } from "@/components/ui/button";
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Input } from "@/components/ui/input"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useRouter } from "next/navigation";


// table props
// pass in columns that you want has the headings
// pass in the data that you want for those columns 
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]

}


export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const router = useRouter();

  //allow the ability to turn off columns by default creators are off but can be turned on
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      'creator': false,
    })
    
  const [reversedData, setReversedData] = React.useState([]);

  // Reverse table data so newest entries are shown first
  React.useEffect(() => {
    setReversedData(data.slice());
  }, [data]);


  const table = useReactTable({
    data: reversedData, // Reverse the order of the data array
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,

    // allows to filter through the dates properly
    filterFns: {
      dateFilterFn: (row, columnId: Number, filterValue: any) => {
        let date = row.getValue('date');

        const day: string = date.getDate().toLocaleString('en-us', { minimumIntegerDigits: 2, useGrouping: false });
        const month: string = (date.getMonth() + 1).toLocaleString('en-us', { minimumIntegerDigits: 2, useGrouping: false });
        const year: string = date.getFullYear().toLocaleString('en-us', { minimumIntegerDigits: 2, useGrouping: false });

        const dateString: string = day + "/" + month + "/" + year;

        let found: boolean = false;

        if (dateString.includes(filterValue)) {
          found = true;
        }

        return found;
      },

    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,


    },
  })
  return (

    <div className=" text-black">

      <div className="flex items-center pb-4 gap-3">
        {/*
        Below are inputs to filter each column. 
        1. It uses the accessor key to find the column data '(table.getColumn("key")'
        2. The users input value is used to search the column 
        3. As users types the column data is updated to match the input string 'onChange'
        
        */}
        <Input
          placeholder="Filter events..."
          value={(table.getColumn("event")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("event")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Filter date..."
          value={(table.getColumn("date")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("date")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Filter creator..."
          value={(table.getColumn("creator")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("creator")?.setFilterValue(event.target.value)
          }
          disabled={columnVisibility['creator'] === false}
          className="max-w-sm transition-all"
        >
        </Input>

        <div className="flex p-4 justify-end">
          {/*
          Below is implementation of the visibility dropdown.
          1. User can select a column to disable or enable
          2. By default creator is off
          
          */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className='bg-white max-h-80 overflow-y-scroll'>
              {table
                .getAllColumns()
                .filter(
                  (column) => column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize text-black"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

 {/*
        Below is the implementation of the table.
        1. Tableheader field contains the headings of the columns
        2. Tablerow field contains the data for the columns
        */}
      <div className="rounded-md border text-black  ">
        <Table className='overflow-hidden'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="font-bold text-center" key={header.id}>
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
          <TableBody className="text-center  ">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="h-16  hover:bg-slate-50  transition-transform transform hover:scale-105 hover:cursor-pointer"
                  onClick={() => {
                    //window.location.href = `/dashboard/${row.original.view}`;
                    router.push(`/dashboard/${row.original.view}`);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

      </div>
           {/*
        Below is the implentation of the next and previous buttons that allow users to navigate 
        pages of the table
        
        */}
      <div className="flex items-center jutify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>

  )

}
