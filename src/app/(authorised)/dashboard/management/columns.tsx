"use client"
//reference  https://ui.shadcn.com/docs/components/data-table

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Management = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  access: string
}

export const columns: ColumnDef<Management>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Surname",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "access",
    header: "Access",
  },
]
