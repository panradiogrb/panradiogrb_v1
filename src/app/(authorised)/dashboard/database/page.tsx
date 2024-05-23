import DashboardNavbar from "../../../../components/ui/navbar/navbar";
import { TbDatabaseSearch } from "react-icons/tb";
import { Database, columns } from "./columns"
import { DataTable } from "../../../../components/database-table"

import { fetchGammaEvents } from "@/lib/data";

export default async function DatabasePage() {
  // const data = await getData()

  // 1. Retrieve list of all Events from database
  const dbEvents = await fetchGammaEvents();

  // 2. Convert 'events' to list of Database objects, to be passed into the DataTable component
  const events: Database[] = dbEvents.map(event => ({
    event: event.name,
    date: event.date,
    creator: event.creator,
    view: `graph/${event.name}`
  }));

  events.sort((a,b) => b.date.getTime() - a.date.getTime());

  return (
    <main className="bg-custom-image2 bg-no-repeat bg-cover bg-center bg-fixed flex flex-row w-full h-max">
      <div className="h-full mx-8 flex-1 z-10 flex flex-col">
        <h1 className="text-3xl font-base mb-5 mt-8 flex text-white items-center gap-x-5">
          <TbDatabaseSearch size={40} className="rounded-md border-2 border-solid border-white text-white p-2" />DATABASE
        </h1>
        <div className=" bg-white rounded-2xl  mb-7 drop-shadow-2xl shadow-2xl shadow-black min-h-[600px]   ">
          <div className=" bg-black rounded-t-lg top-0 w-full h-6 drop-shadow-2xl shadow-2xl shadow-black min-h-6 -translate-y-1"></div>
          <div className="flex justify-center p-10">
            <div className=" flex-auto ">
              <DataTable columns={columns} data={events} />
            </div>
          </div>
        </div>
        <div className="flex  bg-white bottom-0 mt-1 w-full h-1 my-6  "></div>
      </div>
    </main>
  );
}
