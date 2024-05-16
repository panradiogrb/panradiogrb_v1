"use client"
//reference  https://ui.shadcn.com/docs/components/data-table
import { ColumnDef } from "@tanstack/react-table"
import { BsGraphUp } from "react-icons/bs";

import Link from "next/link";

export type RecentEvents = {
  event: string;
  view: string;
};

export const columns: ColumnDef<RecentEvents>[] = [
  {
    accessorKey: "event",
    header: "Event",
  },
  {
    accessorKey: "view",
    header: "View",
    cell: ({ row }) => ( //gpt
      <Link href={`/dashboard/${row.original.view}`} passHref>
        <BsGraphUp size={25} className=" border-2 p-1 border-solid border-black"/>
      </Link>
    ),
  },
];

