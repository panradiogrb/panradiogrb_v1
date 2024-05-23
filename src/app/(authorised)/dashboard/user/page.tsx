import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { RiUserSettingsLine } from "react-icons/ri";
import { Button } from '@/components/ui/button';
import * as React from 'react';
import UpdatePassword from './updatepw';
import { getUserName, getUserRole } from "@/lib/authActions/actions";
import readUserSession from "@/lib/auth";





export default async function UserPage() {
  const session = await readUserSession();
  //console.log(session)
  let userRole: string | null = null;
  let userName: string | null = null;

  if (session.data.user) {
    const roleResult = await getUserRole(session.data.user.id)
    const nameResult = await getUserName(session.data.user.id)
    userRole = roleResult.role === 'researcher' ? 'Researcher' : 'Colleague';
    userName = nameResult.role;
  }


  return (
    <main className="bg-custom-image2 bg-no-repeat bg-cover bg-center bg-fixed flex flex-row w-full h-max">
      <div className="h-full mx-8 flex-1 z-10 flex flex-col">
        <h1 className="text-3xl font-base mb-5 mt-8 flex text-white items-center gap-x-5">
          < RiUserSettingsLine size={40} className="rounded-md border-2 border-solid border-white text-white p-2" />USER SETTINGS
        </h1>
        <div className=" bg-white rounded-2xl  mb-7 drop-shadow-2xl shadow-2xl shadow-black min-h-[600px]  ">
          <div className=" bg-black rounded-t-lg top-0 w-full h-6 drop-shadow-2xl shadow-2xl shadow-black min-h-6 -translate-y-1"></div>
            <UpdatePassword user={userName} role={userRole}/>
          
        </div >
      </div>
    </main>

  );
}