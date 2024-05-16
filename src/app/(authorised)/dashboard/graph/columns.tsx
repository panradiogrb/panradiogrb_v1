"use client"
//reference  https://ui.shadcn.com/docs/components/data-table
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Graph = {
  time: string
  date: string
  rms: string
  detection: string
  length: string
  frequency: string
  flux: string
}

export const columns: ColumnDef<Graph>[] = [
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "rms",
    header: "RMS",
  },

  {
    accessorKey: "detection",
    header: "Detection",
  },
  {
    accessorKey: "length",
    header: "Length",
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
  },
  {
    accessorKey: "flux",
    header: "Flux",
  },
]
