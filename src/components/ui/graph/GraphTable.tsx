'use client'

//This table was built following the tutorial and examples from: https://ui.shadcn.com/docs/components/data-table
//The code from here is considered free use for public or private purposes
//It has been extensively modified with our custom implementations & specific needs, and such we consider it to be effectively of our own work.

import * as React from 'react'


import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    VisibilityState,
    TableOptions,
    RowSelectionState,
} from "@tanstack/react-table"

import { Table as TanTable } from "@tanstack/react-table"

/*import event from '../app/(authorised)/dashboard/graph/page.tsx'
import { CSVLink, CSVDownload} from "react-csv";*/

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from '@/components/ui/checkbox'
import { GammaEvent, Observation } from '@/components/objects/event'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export type DataTable<TData> = {
    element: React.JSX.Element,
    table: TanTable<TData>,
}

export function GetDataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>): DataTable<TData> {

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
        'date': true,
        'time': true,
        'duration': true,
        'frequency': true,
        'bandwidth': false,
        'configuration': false,
        'detection': true,
        'flux': true,
        'fluxError': true,
        'rms': false,
        'notes': false,
        'observer': false,
        'burstAdvocate': false,
        'userId': false,
    })


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getFilteredRowModel: getFilteredRowModel(),
        filterFns: {
            frequencyFilterFn: (row, columnId: number, filterValue: any) => {
                return (row.getValue('frequency') === Number(filterValue))
            },
            dateFilterFn: (row, columnId: Number, filterValue: any) => {
                let date = row.getValue('time');

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
            timeFilterFn: (row, columnId: Number, filterValue: any) => {
                const time: Date = row.getValue('time');

                const hrs = time.getHours().toString().padStart(2, '0');
                const min = time.getMinutes().toString().padStart(2, '0');
                let amOrPm: string = 'AM';

                if (time.getHours() > 11) {
                    amOrPm = 'PM'
                }

                const formattedTime = `${hrs}:${min} ${amOrPm}`;

                let found: boolean = false;

                if (formattedTime.includes(filterValue)) {
                    found = true;
                }

                return found;
            },
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    let dataTable: DataTable<TData> = {
        element: DataTable({
            columns: columns,
            data: [],
            table: table,
        }),
        table: table
    }

    return dataTable;
}


//the below section for 'updaterEvent' is basically saying that it is a parameter of type GammaEvent, but it is not essential
function DataTable<TData, TValue>({
    columns,
    table,
}: DataTableProps<TData, TValue> & { table: Table<TData> }) {

    /*const csvheaders = [
        { label: "name", key: 'name'},
        { label: "date", key: 'date'},
        { label: "creator", key: 'creator'}]

    const csvdata = [
        {name: event.name, date: event.date, creator: event.creator}
    ]*/



    return (
        <div>
            <div>
                <div className="flex items-center pb-4 gap-3">
                    <Input
                        placeholder="Filter date..."
                        value={(table.getColumn("date")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("date")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    >
                    </Input>
                    <Input
                        placeholder="Filter time..."
                        value={(table.getColumn("time")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("time")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    >
                    </Input>
                    <Input
                        type='number'
                        placeholder="Filter frequency..."
                        value={(table.getColumn("frequency")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("frequency")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    >
                    </Input>
                </div>
            </div>
            <div className='flex flex-row justify-center content-center place-items-center mr-5'>
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} {table.getFilteredRowModel().rows.length > 1 ? 'entries' : 'entry'} selected.
                </div>
                <DropdownMenu className='w-1/3 ' modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto text-black">
                            Columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className='text-black bg-white max-h-80 overflow-y-scroll'>
                        {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
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
            <Button
                className="mb-3 text-black"
                variant="outline"
                size="sm"
                disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                onClick={() => {
                    table.resetRowSelection();
                }}
            >
                Clear Selection
            </Button>
            <div className="rounded-md border overflow-x-auto text-black">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className=' '>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className="text-center" key={header.id}>
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
                                    className="h-16  hover:bg-slate-50  transition-transform transform"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="text-center">
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