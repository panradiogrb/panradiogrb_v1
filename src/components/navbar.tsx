'use client'
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { IoMdHome } from "react-icons/io";
import { BsGraphUp } from "react-icons/bs";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { TbDatabaseSearch } from "react-icons/tb";
import { IoLogOutOutline } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import LogoutDialog from './logout-dialog';

const DashboardNavbar = () => {
  //Get path to file to decide which text to highlight
  const filePath: (string | null) = usePathname();

  return (
    <nav className="text-white w-36 h-screen group hover:w-56 transition-all z-30">

      <div className='absolute flex flex-col h-full items-center z-20'>

        <div className="mb-4 flex w-full flex-row justify-center gap-x-2 group-hover:gap-x-6 transition-all content-center">
          <Image className=" ml-[0.9rem] group-hover:ml-7 transition-all w-fit h-fit flex-none my-5 object-cover rounded-full" src="/noavatar.png" alt="" width="35" height="35" />

          <div className='my-5 flex justify-center items-center flex-col'>
            <Link className="text-white hover:text-fuchsia-500  text-base group-hover:text-xl transition-all font-semibold " href="">
              Gemma
            </Link>

            <div className='text-xs text-slate-400 font-extralight'>
              Admin
            </div>

            <div className="w-full h-1 border-solid border-gray-100 opacity-50"></div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-y-10 w-full place-content-between between">
          <Link href='/dashboard'
            className=
            {
              filePath === '/dashboard'
                ?
                'text-space-purple scale-125 group-hover:translate-x-1 flex items-center justify-start  transition-all ml-[3.85rem] group-hover:ml-[2.35rem] gap-x-5'
                :
                'hover:scale-110 hover:translate-x-3 hover:text-fuchsia-500 flex items-center justify-start  transition-all ml-14 group-hover:ml-[2.35rem] gap-x-5'
            }
          >

            <IoMdHome size={35} className="scale-125 group-hover:scale-90 transition-all" />

            <h1 className="scale-0 group-hover:scale-100 w-0   transition-all">
              Dashboard
            </h1>
          </Link>

          <Link href='/dashboard/database'
            className=
            {
              filePath === '/dashboard/database'
                ?
                "text-space-purple scale-125 group-hover:translate-x-3 flex items-center justify-start  transition-all ml-[3.96rem] group-hover:ml-[2.35rem] gap-x-5"
                :
                'hover:scale-110 hover:translate-x-3 hover:text-fuchsia-500 flex items-center justify-start ml-[3.58rem] group-hover:ml-[2.55rem] transition-all gap-x-[1.5rem]'
            }
          >
            <TbDatabaseSearch size={31} className="scale-125 group-hover:scale-90 transition-all" />

            <h1 className="scale-0 group-hover:scale-100 w-0 transition-all">
              Database
            </h1>

          </Link>

          <Link href='/dashboard/entry'
            className=
            {
              filePath === '/dashboard/entry'
                ?
                "text-space-purple scale-125 group-hover:translate-x-3 flex items-center justify-start  transition-all ml-[3.96rem] group-hover:ml-[2.35rem] gap-x-5"
                :
                'hover:scale-110 hover:translate-x-3 hover:text-fuchsia-500 flex items-center justify-start ml-[3.58rem] group-hover:ml-[2.55rem] transition-all gap-x-[1.5rem]'
            }
          >

            <BsDatabaseFillAdd size={31} className="scale-125 group-hover:scale-90 transition-all" />

            <h1 className="scale-0 group-hover:scale-100 w-0 transition-all">
              New
            </h1>
          </Link>

          <Link href="/dashboard/graph"
            className=
            {
              filePath?.includes('/dashboard/graph')
                ?
                "text-space-purple scale-125 group-hover:translate-x-2 flex items-center justify-start  transition-all ml-[4.05rem] group-hover:ml-[2.35rem] gap-x-5"
                :
                'hover:scale-110 hover:translate-x-3 hover:text-fuchsia-500 flex items-center justify-start ml-[3.65rem] group-hover:ml-[2.55rem] transition-all gap-x-6'
            }
          >

            <BsGraphUp size={30} className="scale-125 group-hover:scale-90 transition-all" />

            <h1 className="scale-0 group-hover:scale-100 w-0 transition-all">
              Graphing
            </h1>
          </Link>


          <Link href='/dashboard/management'
            className=
            {
              filePath === '/dashboard/management'
                ?
                "text-space-purple scale-125 group-hover:translate-x-2 flex items-center justify-start  transition-all ml-[3.97rem] group-hover:ml-[2.35rem] gap-x-5"
                :
                'hover:scale-110 hover:translate-x-3 hover:text-fuchsia-500 flex items-center justify-start ml-[3.63rem] group-hover:ml-[2.65rem] transition-all gap-x-5'
            }
          >

            <MdManageAccounts size={35} className="scale-125 group-hover:scale-90 transition-all" />

            <h1 className="scale-0 group-hover:scale-100 w-0 transition-all">
              Users
            </h1>
          </Link>
        </div>

        <div className="flex-1"></div>

        <LogoutDialog>
        </LogoutDialog>
      </div>

      <div className="opacity-80 h-full w-36 group-hover:w-56 bg-gradient-to-t to-navbar-admin-purple via-transparent from-navbar-admin-purple group-hover:rounded-br-[8.5rem] transition-all drop-shadow-2xl shadow-2xl rounded-br-[5.5rem]"></div>


    </nav>
  );
}

export default DashboardNavbar;