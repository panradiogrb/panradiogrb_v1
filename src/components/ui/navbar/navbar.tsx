'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSelectedLayoutSegments } from 'next/navigation';

import { BsDatabaseFillAdd } from "react-icons/bs";
import { TbDatabaseSearch } from "react-icons/tb";
import LogoutDialog from '../../logout-dialog';
import { GammaEvent } from '@/components/objects/event';
import { RiCalendarEventFill } from "react-icons/ri";


//const DashboardNavbar = (loggedUserName: string | null, loggedUserRole: string | null) => {
  const DashboardNavbar: React.FC<{ loggedUserName: string | null; loggedUserRole: string | null }> = ({ loggedUserName, loggedUserRole }) => {
  //Get the current event
  const [curEvent, setCurEvent] = useState<string>('N/A');

  const segment = useSelectedLayoutSegments();

  useEffect(() => {
    if (segment.length > 1 && segment[0] === 'graph') {
      console.log('looking at an event');
      setCurEvent(segment[1]);
    }
  }, [segment])

  //segment[0] = grpah & segment[1] = id then do something in useEffect

  //Get path to file to decide which text to highlight
  const filePath: (string | null) = usePathname();

  //const userName: string = GetUserName();
  //const userLevel: string = GetUserLevel();

  const userName: string | null = loggedUserName;
  const userLevel: string | null = loggedUserRole;
  //Active events will hold the currently opened events

  return (
    <nav className="text-white w-36 h-screen group hover:w-56 transition-all z-30">

      <div className='absolute flex flex-col h-full items-center z-20'>

        <div className="mb-4 flex w-full flex-row justify-center gap-x-2 group-hover:gap-x-6 transition-all content-center hover:cursor-default">
          <Image
            className=" ml-[0.9rem] group-hover:ml-7 transition-all w-fit h-fit flex-none my-5 object-cover rounded-full drop-shadow-xl"
            // src="/noavatar.png"
            src="/logo.png"
            alt=""
            width="35"
            height="35">
          </Image>

          <div className='my-5 flex justify-center items-center flex-col'>
            <Link href='/dashboard/user'
           
            >

            <h1 className="text-white  text-base group-hover:text-xl transition-all font-semibold hover:text-fuchsia-500">
              {userName}
            </h1>
            </Link>

            

            <div className='text-xs text-slate-400 font-extralight hover:cursor-default'>
              {userLevel}
            </div>

            <div className="w-full h-1 border-solid border-gray-100 opacity-50"></div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-y-16 w-full  between">


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

          {userLevel === 'Researcher' && (
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
          )}

          <Link href={"/dashboard/graph/" + curEvent}
            className=
            {
              curEvent !== 'N/A'
                ?
                filePath?.includes('/dashboard/graph')
                  ?
                  "text-space-purple scale-125 group-hover:translate-x-2 flex items-center justify-start  transition-all ml-[4rem] group-hover:ml-[2.35rem] gap-x-5"
                  :
                  'hover:scale-110 hover:translate-x-3 hover:text-fuchsia-500 flex items-center justify-start ml-[3.65rem] group-hover:ml-[2.55rem] transition-all gap-x-6'
                :
                'scale-0 flex items-center justify-start  transition-all ml-[4rem]'
            }
          >

            <RiCalendarEventFill size={30} className="scale-125 group-hover:scale-90 transition-all"></RiCalendarEventFill>

            <h1 className="scale-0 group-hover:scale-100 w-0 transition-all">
              {curEvent}
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

function GetUserName(): string {
  /* placeholder function */
  return 'Gemma';
}

function GetUserLevel(): string {
  /* placeholder function */
  return 'Admin';
}

export default DashboardNavbar;