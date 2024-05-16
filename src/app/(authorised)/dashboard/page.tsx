import DashboardNavbar from "../../../components/ui/navbar/navbar";
import { IoMdHome } from "react-icons/io";
import { RecentEvents, columns } from "./columns";
import { DashboardDataTable } from "./dashboard-table";
import readUserSession from "@/lib/auth";
import { redirect } from "next/navigation";

async function getData(): Promise<RecentEvents[]> {

  return [
    {
      event: "Event 1",
      view: "Graph", //instead of graph we will pass in the id
    },
    {
      event: "Event 2",
      view: "Graph", //instead of graph we will pass in the id
    },
    
    {
      event: "Event 3",
      view: "Graph", //instead of graph we will pass in the id
    },
    {
      event: "Event 4",
      view: "Graph", //instead of graph we will pass in the id
    },
    {
      event: "Event 1",
      view: "Graph", //instead of graph we will pass in the id
    },
    {
      event: "Event 2",
      view: "Graph", //instead of graph we will pass in the id
    },
    
    {
      event: "Event 3",
      view: "Graph", //instead of graph we will pass in the id
    },
    {
      event: "Event 4",
      view: "Graph", //instead of graph we will pass in the id
    },
    
    
    
    
  ]
}
export default async function dashboard() {
  //const sessionData = await readUserSession()
  const data = await getData()
  return (
    <main className="bg-custom-image2 bg-no-repeat bg-cover bg-center bg-fixed flex flex-row w-full h-max">

      <div className="h-full mx-8 flex-1 z-10 flex flex-col">
        <h1 className="text-3xl font-base mb-5 mt-8 flex text-white items-center gap-x-5">
        <IoMdHome size={40} className="rounded-md border-2 border-solid border-white text-white p-2"/>DASHBOARD
        </h1>


        <div className=" bg-white rounded-2xl  mb-7 drop-shadow-2xl shadow-2xl shadow-black min-h-[600px]  ">
          <div className=" bg-black rounded-t-lg top-0 w-full h-6 drop-shadow-2xl shadow-2xl shadow-black min-h-6 -translate-y-1"></div>
          <div className="flex flex-row">


            <div className=" mr-auto  w-1/3 border-x ">
              <h1 className=" text-center text-2xl  text-black py-6 font-semibold   ">RECENT EVENTS</h1>

              <div className=" ">


                  <div className=" ">
                    <DashboardDataTable columns={columns} data={data} />
                  </div>



 
                

              </div>

            </div>

            <div className=" ml-auto w-2/3  ">
              <h1 className=" text-center text-2xl font-semibold text-black py-6 ">RECENT ACTIVITY</h1>

             
            </div>

          </div>



        </div>
        <div className="flex  bg-white bottom-0 mt-1 w-full h-1 my-6  "></div>
      </div>
    </main>
    );
  }
  