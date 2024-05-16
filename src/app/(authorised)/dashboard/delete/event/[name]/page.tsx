import React from 'react'
import { Button } from "@/components/ui/button";

import { fetchSelectedObservations } from '@/lib/data';
import Link from 'next/link';
import { deleteEvent } from '@/lib/actions';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { MdDelete } from "react-icons/md";


export default async function DeleteEvent({ params }: { params: { name: string } }) {
    // 1. Retrieve event name through params, which is retrieved through dynamic route [name]
    const { name } = params;

    // 2. Retrieve events observations to list out number of observations the user will also be deleting if they delete this event
    const observations = await fetchSelectedObservations(name);

    // 3. Bind event id to delete event server action, to allow the action to delete this event if confirmed, and assign binded action to delete button form element
    const deleteEventByName = deleteEvent.bind(null, name);

    return (

        <main className="bg-custom-image2 bg-no-repeat bg-cover bg-center bg-fixed flex flex-row w-full h-max">
            <div className="h-full mx-8 flex-1 z-10 flex flex-col">
                <h1 className="text-3xl font-base mb-5 mt-8 flex text-white items-center gap-x-5">
                    < MdDelete size={40} className="rounded-md border-2 border-solid border-white text-white p-2" />DELETE EVENT
                </h1>
                <div className=" bg-white rounded-2xl  mb-7 drop-shadow-2xl shadow-2xl shadow-black min-h-[600px] ">

                    <div className=" bg-black rounded-t-lg top-0 w-full h-6 drop-shadow-2xl shadow-2xl shadow-black min-h-6 -translate-y-1"></div>

                        {/* BACK TO EVENT BUTTON */}
                        {/* <div className="flex my-4 ml-8 ">
                <Link href={`/dashboard/graph/${name}`}
                >
                    <Button className=" bg-white drop-shadow rounded-md focus:outline-none w-20  text-black border duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all ">
                        < IoIosArrowRoundBack size={50} className=" text-black p-2" />
                    </Button>
                </Link>
            </div> */}

                        <div className='flex flex-col text-center w-9/12 h-3/6 my-20 rounded-md mx-auto'>

                            <h1 className=' text-4xl text-red-500 text-center font-extrabold'>WARNING - EVENT DELETE</h1>
                            <div className='text-center p-10'>
                                You are about to delete event '{name}', which will include deleting all <span className='font-extrabold text-blue-600 '>{observations.length}</span> of this events observations.
                            </div>
                            <div className='text-center p-10 text-red-600 font-bold'>Are you sure you want to delete event '{name}'?</div>
                            <div className=' p-10'>
                                <div className='flex flex-row gap-5 m-5 justify-start font-normal drop-shadow-2xl content-baseline'>
                                    <Link href={`/dashboard/graph/${name}`}>
                                        <Button className='duration-150 hover:shadow-stone-300 hover:shadow-md hover:border-black shadow focus:border-black focus:duration-300 transition-all '>
                                            Cancel
                                        </Button>
                                    </Link>

                                    <form action={deleteEventByName} className='scale-90 ml-auto'>
                                        <Button className=' bg-red-600 text-white duration-150 hover:shadow-stone-300 hover:shadow-md hover:border-black shadow focus:border-black focus:duration-300 transition-all  '>
                                            Delete
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                
            </div>

        </main>
    )
}
