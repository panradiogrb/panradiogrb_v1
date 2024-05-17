'use client'

//The format of this table was built following the tutorial and examples from: https://ui.shadcn.com/docs/components/data-table
//The original code from this link is considered free use for public or private purposes, but our implementation
//has been individually customized extensively for our specific needs and is therefore our own work.

import { Observation } from '@/components/objects/event';
import { getImageById } from '@/lib/getImageKey';
import { ColumnDef } from '@tanstack/react-table'
import { FcCheckmark } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from '../button';
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowUnsorted } from "react-icons/ti";
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';

import readUserSession from '@/lib/auth';
import { getUserRole } from '@/lib/authActions/actions';
import Link from 'next/link';

//Data shape is defined in the event.tsx object

/*
    ColumnDef<Observation>[]
    ----------------
    This defines the columns of a table constructed with this ColumnDef.
    For this ColumnDef, it will list all the attributes of a given Observation object;
        time
        detection
        duration
        RMS
        frequency
        flux
        fluxError

    It will also construct & display the following;
        date

    Each column definition has the following attributes;
        accessorKey -   The value taken from the object to go in this column. MUST be the same as the variable name in the object
        header  -   The title for this header on the table. Eg. 'Date', 'Time', etc

    The format of the cell information can be edited through the following attritbute;
        cell    -   What is actually displayed in this cell on the table.
                    This is generally used to format the data for that object, rather thane setting a static value.
*/


/**********************************************************
 * RESEARCHER COLUMNS FOR OBSERVATION RECORD ACTIONS MODAL
 **********************************************************/
export const researcherColumns: ColumnDef<Observation>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'date',
        accessorKey: 'time',
        filterFn: 'dateFilterFn',
        header: ({ column }) => {
            const noSortArrow = <TiArrowUnsorted className="ml-2 h-4 w-4"></TiArrowUnsorted>
            const ascSortArrow = <TiArrowSortedUp className="ml-2 h-4 w-4"></TiArrowSortedUp>
            const descSortArrow = <TiArrowSortedDown className="ml-2 h-4 w-4"></TiArrowSortedDown>

            let sortArrow = noSortArrow;

            return (
                <div>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() == 'asc')}
                    >
                        Date
                        {sortArrow}
                    </Button>

                </div>
            )
        },
        cell: ({ row }) => {
            const date: Date = row.getValue('time');

            const day: string = date.getDate().toLocaleString('en-us', { minimumIntegerDigits: 2, useGrouping: false });
            const month: string = (date.getMonth() + 1).toLocaleString('en-us', { minimumIntegerDigits: 2, useGrouping: false });
            const year: string = date.getFullYear().toLocaleString('en-us', { minimumIntegerDigits: 2, useGrouping: false });

            const dateString: string = day + "/" + month + "/" + year;

            return <div>{dateString}</div>
        }
    },
    {
        id: 'time',
        accessorKey: 'time',
        filterFn: 'timeFilterFn',
        header: ({ column }) => (
            <div className="justify-center text-center">
                <div className='w-full py-2 px-4'>Time</div>

            </div>
        ),
        cell: ({ row }) => {
            const time: Date = row.getValue('time');

            const hrs = time.getHours().toString().padStart(2, '0');
            const min = time.getMinutes().toString().padStart(2, '0');
            let amOrPm: string = 'AM';

            if (time.getHours() > 11) {
                amOrPm = 'PM'
            }

            const formattedTime = `${hrs}:${min} ${amOrPm}`;

            return <div>{formattedTime}</div>
        },
    },
    {
        id: 'duration',
        accessorKey: 'duration',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() == 'asc')}
                >
                    Duration (Hr)
                    <TiArrowUnsorted className="ml-2 h-4 w-4"></TiArrowUnsorted>
                </Button>
            )
        },
        cell: ({ row }) => {
            const time: number = row.getValue('duration');
            return ((time / 60) / 60).toFixed(2);
        }
    },
    {
        id: 'frequency',
        accessorKey: 'frequency',
        filterFn: 'frequencyFilterFn',
        header: ({ column }) => {
            return (
                <div className="justify-center flex flex-col">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() == 'asc')}
                        className='w-full'
                    >
                        Frequency (GHz)
                        <TiArrowUnsorted className="ml-2 h-4 w-4"></TiArrowUnsorted>
                    </Button>
                </div>
            )
        },
    },
    {
        id: 'bandwidth',
        accessorKey: 'bandwidth',
        header: () => {
            return (
                <div className="justify-center flex flex-col">
                    <Button
                        variant="ghost"
                        className='w-full'>
                        Bandwidth (GHz)
                    </Button>
                </div>
            )
        },
    },
    {
        id: 'configuration',
        accessorKey: 'configuration',
        header: 'Configuration',
    },
    {
        id: 'detection',
        accessorKey: 'detection',
        header: 'Detection',
        cell: (({ row }) => {
            if (row.getValue('detection') == true) {
                return <FcCheckmark className="scale-150 self-center w-full"></FcCheckmark>
            }
            return <FcCancel className="self-center w-full"></FcCancel>
        })
    },
    {
        id: 'flux',
        accessorKey: 'flux',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() == 'asc')}
                >
                    Flux Density (µJy)
                    <TiArrowUnsorted className="ml-2 h-4 w-4"></TiArrowUnsorted>
                </Button>
            )
        },
    },
    {
        id: 'fluxError',
        accessorKey: 'fluxError',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() == 'asc')}
                >
                    Flux Density Error (µJy)
                    <TiArrowUnsorted className="ml-2 h-4 w-4"></TiArrowUnsorted>
                </Button>
            )
        },
    },
    {
        id: 'rms',
        accessorKey: 'RMS',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() == 'asc')}
                >
                    RMS (µJy)
                    <TiArrowUnsorted className="ml-2 h-4 w-4"></TiArrowUnsorted>
                </Button>
            )
        },
    },
    {
        id: 'notes',
        accessorKey: 'notes',
        header: 'Notes',
    },
    {
        id: 'observer',
        accessorKey: 'observer',
        header: 'Observer',
    },
    {
        id: 'burstAdvocate',
        accessorKey: 'burstAdvocate',
        header: 'Burst Advocate',
    },
    {
        id: 'userId',
        accessorKey: 'userId',
        header: 'Input User'
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const observation: Observation = row.original;

            return (
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-200 ">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className='z-50 bg-white'>
                        <DropdownMenuLabel className='text-black'>Actions</DropdownMenuLabel>

                        {/* EDIT OBSERVATION BUTTON */}
                        <DropdownMenuItem
                            className="text-black font-normal hover:cursor-pointer scale-95 hover:scale-100 transition-all hover:bg-gray-100"
                            onClick={async () => {
                                console.log(`Download fits for observation ${observation.id}`)
                                try {
                                    const key = await getImageById(observation.id)
                                    if (key) {
                                        console.log(`fits key shouldnt be undef, ${key}`,)
                                        const imageUrl = `https://grbbucket.s3.amazonaws.com/${key}`;
                                        //console.log(imageUrl)

                                        // Trigger the download
                                        const link = document.createElement('a');
                                        link.href = imageUrl;
                                        link.setAttribute('download', '');
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }
                                } catch (error) {
                                    console.error('Error downloading fits file');
                                }
                            }}
                        >
                            Download FITS File
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className='bg-gray-200'></DropdownMenuSeparator>

                        {/* EDIT OBSERVATION BUTTON TO REDIRECT TO EDIT FORM */}
                        <DropdownMenuGroup>
                            {/* // When edit button clicked, redirect to observations edit form and pass id */}
                            <Link href={`/dashboard/edit/observation/${observation.id}`}>
                                <DropdownMenuItem
                                    className="text-black font-normal hover:cursor-pointer scale-95 hover:scale-100 transition-all hover:bg-gray-100"
                                >
                                    Edit Observation
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>

                        {/* DELETE OBSERVATION BUTTON TO REDIRECT TO OBSERVATION DELETE CONFIRMATION PAGE */}
                        <Link href={`/dashboard/delete/observation/${observation.id}`}>
                            <DropdownMenuItem
                                className="text-black font-normal hover:cursor-pointer scale-95 hover:scale-100 transition-all hover:bg-red-100"> {/* Official documentation from this implementation: You can access the row data using row.original */}
                                Delete Observation                                                                                    {/* in the cell function. Use this to handle actions for your row eg. use the id to make a DELETE call to your API. */}
                            </DropdownMenuItem>
                        </Link>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

/**********************************************************
 * COLLEAGUE COLUMNS FOR OBSERVATION RECORD ACTIONS MODAL
 **********************************************************/
export const colleagueColumns: ColumnDef<Observation>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'date',
        accessorKey: 'time',
        filterFn: 'dateFilterFn',
        header: ({ column }) => {
            const noSortArrow = <TiArrowUnsorted className="ml-2 h-4 w-4"></TiArrowUnsorted>
            const ascSortArrow = <TiArrowSortedUp className="ml-2 h-4 w-4"></TiArrowSortedUp>
            const descSortArrow = <TiArrowSortedDown className="ml-2 h-4 w-4"></TiArrowSortedDown>

            let sortArrow = noSortArrow;

            return (
                <div>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() == 'asc')}
                    >
                        Date
                        {sortArrow}
                    </Button>

                </div>
            )
        },
        cell: ({ row }) => {
            const date: Date = row.getValue('time');

            const day: string = date.getDate().toLocaleString('en-us', { minimumIntegerDigits: 2, useGrouping: false });
            const month: string = (date.getMonth() + 1).toLocaleString('en-us', { minimumIntegerDigits: 2, useGrouping: false });
            const year: string = date.getFullYear().toLocaleString('en-us', { minimumIntegerDigits: 2, useGrouping: false });

            const dateString: string = day + "/" + month + "/" + year;

            return <div>{dateString}</div>
        }
    },
    {
        id: 'time',
        accessorKey: 'time',
        filterFn: 'timeFilterFn',
        header: ({ column }) => (
            <div className="justify-center text-center">
                <div className='w-full py-2 px-4'>Time</div>

            </div>
        ),
        cell: ({ row }) => {
            const time: Date = row.getValue('time');

            const hrs = time.getHours().toString().padStart(2, '0');
            const min = time.getMinutes().toString().padStart(2, '0');
            let amOrPm: string = 'AM';

            if (time.getHours() > 11) {
                amOrPm = 'PM'
            }

            const formattedTime = `${hrs}:${min} ${amOrPm}`;

            return <div>{formattedTime}</div>
        },
    },
    {
        id: 'duration',
        accessorKey: 'duration',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() == 'asc')}
                >
                    Duration
                    <TiArrowUnsorted className="ml-2 h-4 w-4"></TiArrowUnsorted>
                </Button>
            )
        },
    },
    {
        id: 'frequency',
        accessorKey: 'frequency',
        filterFn: 'frequencyFilterFn',
        header: ({ column }) => {
            return (
                <div className="justify-center flex flex-col">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() == 'asc')}
                        className='w-full'
                    >
                        Frequency
                        <TiArrowUnsorted className="ml-2 h-4 w-4"></TiArrowUnsorted>
                    </Button>
                </div>
            )
        },
    },
    {
        id: 'bandwidth',
        accessorKey: 'bandwidth',
        header: 'Bandwidth',
    },
    {
        id: 'configuration',
        accessorKey: 'configuration',
        header: 'Configuration',
    },
    {
        id: 'detection',
        accessorKey: 'detection',
        header: 'Detection',
        cell: (({ row }) => {
            if (row.getValue('detection') == true) {
                return <FcCheckmark className="scale-150"></FcCheckmark>
            }
            return <FcCancel></FcCancel>
        })
    },
    {
        id: 'flux',
        accessorKey: 'flux',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() == 'asc')}
                >
                    Flux Density (µJy)
                    <TiArrowUnsorted className="ml-2 h-4 w-4"></TiArrowUnsorted>
                </Button>
            )
        },
    },
    {
        id: 'fluxError',
        accessorKey: 'fluxError',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() == 'asc')}
                >
                    Flux Density Error
                    <TiArrowUnsorted className="ml-2 h-4 w-4"></TiArrowUnsorted>
                </Button>
            )
        },
    },
    {
        id: 'rms',
        accessorKey: 'RMS',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() == 'asc')}
                >
                    RMS
                    <TiArrowUnsorted className="ml-2 h-4 w-4"></TiArrowUnsorted>
                </Button>
            )
        },
    },
    {
        id: 'notes',
        accessorKey: 'notes',
        header: 'Notes',
    },
    {
        id: 'observer',
        accessorKey: 'observer',
        header: 'Observer',
    },
    {
        id: 'burstAdvocate',
        accessorKey: 'burstAdvocate',
        header: 'Burst Advocate',
    },
    {
        id: 'userId',
        accessorKey: 'userId',
        header: 'Input User'
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const observation: Observation = row.original;

            return (
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="text-black h-8 w-8 p-0 hover:bg-gray-200 ">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className='z-50 bg-white'>
                        <DropdownMenuLabel className='text-black'>Actions</DropdownMenuLabel>

                        {/* DOWNLOAD FITS FILE BUTTON */}
                        <DropdownMenuItem
                            className="text-black font-normal hover:cursor-pointer scale-95 hover:scale-100 transition-all hover:bg-gray-100"
                            onClick={async () => {
                                console.log(`Download fits for observation ${observation.id}`)
                                try {
                                    const key = await getImageById(observation.id)
                                    if (key) {
                                        console.log(`fits key shouldnt be undef, ${key}`,)
                                        const imageUrl = `https://grbbucket.s3.amazonaws.com/${key}`;
                                        //console.log(imageUrl)

                                        // Trigger the download
                                        const link = document.createElement('a');
                                        link.href = imageUrl;
                                        link.setAttribute('download', '');
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }
                                } catch (error) {
                                    console.error('Error downloading fits file');
                                }
                            }}
                        >
                            Download FITS File
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]