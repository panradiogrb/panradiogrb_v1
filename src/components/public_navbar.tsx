'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import LoginDialog from './login-dialog';

//To see results of test, navigate to a page in the public facing website and perform a 'hard reload' by manually reloading the page.
//The results will appear in the log of the terminal running the website dev process.
function TestNavbar(path: (string | null)) {
    //Assume test has failed
    let pass: boolean = false;
    
    //There is a path & it is one of the necessary ones!
    if(path != null && (path === "/" || path === "/code" || path === "/team" || path === "/project" || path === "/dashboard"))
    {
      pass = true;
    }
  
    return pass;
}

const PublicNavbar = () => {
    //Get location of file for use in navbar
    const filePath: (string | null) = usePathname();

    //Test the text has successfully been 
    let test: boolean = TestNavbar(filePath);
    console.log("Successfully got path: " + test + " , Filepath: " + filePath);

    return (
        <nav className=" sm:w-full sm:h-max text-center flex flex-col sm:flex-row sm:text-2xl text-sm justify-between pl-24 pb-16 pt-10 text-white font-extrabold z-50">
            <div className="order-2 sm:order-1 flex-1 flex flex-col sm:flex-row gap-y-6 justify-between gap-x-8 sm:mr-10 w-fit self-center min-[320px]:flex-row min-[320px]:self-start min-[320px]:-mx-10 ">
                <Link href="/" className={filePath === '/' ? "text-space-purple scale-125 sm:-translate-y-3 sm:translate-x-0  text-shadow-lg shadow-black transition-all" : "hover:text-purple-100 hover:scale-110 transition-all"}>Home</Link>
                <Link href="/project" className={filePath === '/project' ? "text-space-purple scale-125 sm:-translate-y-3 sm:translate-x-0 text-shadow-lg shadow-black transition-all" : "hover:text-purple-100 hover:scale-110 transition-all"}>Project</Link>
                <Link href="/science" className={filePath?.includes('/science') ? "text-space-purple scale-125 sm:-translate-y-3 sm:translate-x-0  text-shadow-lg shadow-black transition-all" : "hover:text-purple-100 hover:scale-110 transition-all"}>Science</Link>
                <Link href="/team" className={filePath === '/team' ? "text-space-purple scale-125 sm:-translate-y-3 sm:translate-x-0  text-shadow-lg shadow-black transition-all" : "hover:text-purple-100 hover:scale-110 transition-all"}>Team</Link>
            </div>
            <div className="sm:flex-1 order-1 sm:order-2 ml-auto scale-75 flex justify-end self-center">
                <LoginDialog></LoginDialog>
            </div>
        </nav>
    );

    //<Link href="/dashboard" className="sm:float-right hover:opacity-100 opacity-10 hover:text-space-purple hover:scale-110 transition-all">Login</Link>
}

export default PublicNavbar;