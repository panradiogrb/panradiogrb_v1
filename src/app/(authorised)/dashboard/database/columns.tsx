"use client"
//reference  https://ui.shadcn.com/docs/components/data-table
import { ColumnDef } from "@tanstack/react-table"
import { BsGraphUp } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link";
import { GammaEvent } from "@/components/objects/event";

export type Database = {
  event: string;
  date: Date;
  creator: string;
  view: string;

};

export const columns: ColumnDef<Database>[] = [
  {
    accessorKey: "event",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" font-bold"
        >
          Event
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    
  },
  {
    accessorKey: "date",
    filterFn: 'dateFilterFn',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" font-bold"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date: Date = row.getValue('date');

      const day: string = date.getDate().toLocaleString('en-us', { minimumIntegerDigits: 2, useGrouping: false });
      const month: string = (date.getMonth() + 1).toLocaleString('en-us', { minimumIntegerDigits: 2, useGrouping: false });
      const year: string = date.getFullYear().toLocaleString('en-us', { minimumIntegerDigits: 2, useGrouping: false });

      const dateString: string = day + "/" + month + "/" + year;

      return <div>{dateString}</div>
    }
  },
  {
    accessorKey: "creator",
    header: "Creator",
  },
  // {
  //   accessorKey: "view",
  //   header: "View",
  //   cell: ({ row }) => ( //gpt
  //     <Link href={`/dashboard/${row.original.view}`} passHref>
  //       <Button className=" hover:bg-slate-200 transition duration-300 ease-in-out ">
  //         {/* more info */}
  //       {/* <BsGraphUp size={25} className="p-1"/> */}

  //       </Button>
  //     </Link>
  //   ),
  // },
];