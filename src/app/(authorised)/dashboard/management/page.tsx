import DashboardNavbar from "../../../../components/ui/navbar/navbar";
import { Management, columns } from "./columns"
import { DataTable } from "../../../../components/database-table"
import { MdManageAccounts } from "react-icons/md";

async function getData(): Promise<Management[]> {
  // Fetch data from your API here. BACKEND TEAM CAN START HERE
  return [
    {
      id: "",
      firstName: "Gemma",
      lastName: "Anderson",
      email: "fakeemail@gmail.com",
      role: "Admin",
      access: "",
    },
    {
      id: "",
      firstName: "Bob",
      lastName: "Bob",
      email: "fakeemail@gmail.com",
      role: "User",
      access: "Remove",
    },
    

    
  ]
}
export default async function Graph() {
  const data = await getData()
    return (
      <main className="bg-custom-image2 bg-no-repeat bg-cover bg-center bg-fixed flex flex-row w-full h-max">

        <div className="h-full mx-8 flex-1 z-10 flex flex-col">
          <h1 className="text-3xl font-base mb-5 mt-8 flex text-white items-center gap-x-5">
            <MdManageAccounts  size={40} className="rounded-md border-2 border-solid border-white text-white p-2" />MANAGE USERS
          </h1>


          <div className=" bg-white rounded-2xl mb-7 drop-shadow-2xl shadow-2xl shadow-black min-h-[600px]   ">
            <div className=" bg-black rounded-t-l top-0 w-full h-6 drop-shadow-2xl shadow-2xl shadow-black min-h-6 -translate-y-1"></div>




          </div>
          <div className="flex  bg-white bottom-0 mt-1 w-full h-1 my-6  "></div>

        </div>
      </main>

      // <main >

      //   <div className=" fixed bg-custom-image2 w-screen h-screen bg-cover bg-center bg-fixed  ">

      //       <div className=" bg-violet-950 bg-opacity-25  bg-cover w-screen h-screen grid">



      //       <div className="fixed">
      //               <DashboardNavbar   />
      //       </div>

      //       <div className=" text-center">
      //           <h1 className="text-5xl font-bold ml-80 my-36 flex text-white">
      //               USER MANAGEMENT
      //           </h1>
      //       </div>

      //       <div className="fixed bottom-10 left-72 w-9/12 h-2/3 bg-white rounded-lg overflow-auto">

      //       <div className="sticky bg-black top-0 w-full z-10 h-5"></div>

      //       <div className="container mx-auto py-10">
      //               <DataTable columns={columns} data={data} />
      //             </div>

      //       </div>

      //       </div>         
       
         



      //   </div>


        
        
  
      // </main>
    );
  }
  