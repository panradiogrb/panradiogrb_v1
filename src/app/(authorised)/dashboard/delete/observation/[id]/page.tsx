import React from 'react'
import { Button } from "@/components/ui/button";

import { fetchObservationById, fetchSelectedObservations } from '@/lib/data';
import Link from 'next/link';
import { deleteObservation } from '@/lib/actions';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { MdDelete } from "react-icons/md";

export default async function DeleteObservation({ params }: { params: { id: string } }) {
    // 1. Retrieve event name through params, which is retrieved through dynamic route [name]
    const { id } = params;

    // 2. Retrieve specific observation record to be deleted
    const observation = await fetchObservationById(parseFloat(id));

    // 3. Bind event id to delete event server action, to allow the action to delete this event if confirmed, and assign binded action to delete button form element
    const deleteObservationById = deleteObservation.bind(null, observation?.observation_id ?? -1);

    return (
        <main className="bg-custom-image2 bg-no-repeat bg-cover bg-center bg-fixed flex flex-row w-full h-max">
            <div className="h-full mx-8 flex-1 z-10 flex flex-col">
                <h1 className="text-3xl font-base mb-5 mt-8 flex text-white items-center gap-x-5">
                    < MdDelete size={40} className="rounded-md border-2 border-solid border-white text-white p-2" />DELETE OBSERVATION
                </h1>
                <div className=" bg-white rounded-2xl  mb-7 drop-shadow-2xl shadow-2xl shadow-black min-h-[600px] ">

                    <div className=" bg-black rounded-t-lg top-0 w-full h-6 drop-shadow-2xl shadow-2xl shadow-black min-h-6 -translate-y-1"></div>

            {/* BACK TO EVENT BUTTON */}
            {/* <div className="flex my-4 ml-8 ">
                <Link href={`/dashboard/graph/${observation?.parent}`}
                >
                    <Button className=" bg-white drop-shadow rounded-md focus:outline-none w-20  text-black border duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all ">
                        < IoIosArrowRoundBack size={50} className=" text-black p-2" />
                    </Button>
                </Link>
            </div> */}
            <div className='flex flex-col  w-9/12 h-3/6 my-10 rounded-md mx-auto'>


            <h1 className=' text-4xl text-red-500 text-center font-extrabold p-10'>WARNING - OBSERVATION DELETE</h1>
            <div className='text-center'>
                You are about to delete an observation which contains the following information:
            </div>

            {/* OBSERVATION FIELDS OF OBSERVATION TO BE DELETED */}
            <div className="flex justify-center items-center">
                <div className='m-5  '>
                    <div><span className='font-bold'>Event</span> : <span>{observation?.parent}</span></div>
                    <div><span className='font-bold'>Observer</span> : <span>{observation?.observer}</span></div>
                    <div><span className='font-bold'>Burst Advocate</span> : <span>{observation?.burstadvocate}</span></div>
                    <div><span className='font-bold'>Data Processor</span> : <span>{observation?.data_processor}</span></div>
                    <div><span className='font-bold'>Observation Creator</span> : <span>{observation?.username}</span></div>
                    <div><span className='font-bold'>Observation Start Time</span> : <span>{observation?.time.toString()}</span></div>
                    <div><span className='font-bold'>Observation End Time</span> : <span>{observation?.endtime.toString()}</span></div>
                    <div><span className='font-bold'>Duration</span> : <span>{observation?.duration.toNumber()}</span></div>
                    <div><span className='font-bold'>Frequency</span> : <span>{observation?.frequency.toNumber()}</span></div>
                    <div><span className='font-bold'>Bandwidth</span> : <span>{observation?.bandwidth.toNumber()}</span></div>
                    <div><span className='font-bold'>Configuration</span> : <span>{observation?.configuration}</span></div>
                    <div><span className='font-bold'>Detection</span> : <span>{observation?.detection === true ? 'True' : 'False'}</span></div>
                    <div><span className='font-bold'>Flux</span> : <span>{observation?.flux.toNumber()}</span></div>
                    <div><span className='font-bold'>Flux Error</span> : <span>{observation?.fluxerror.toNumber()}</span></div>
                    <div><span className='font-bold'>RMS</span> : <span>{observation?.rms.toNumber()}</span></div>
                    <div><span className='font-bold'>RA</span> : <span>{observation?.ra}</span></div>
                    <div><span className='font-bold'>DEC</span> : <span>{observation?.dec}</span></div>
                    <div><span className='font-bold'>Positional Error</span> : <span>{observation?.poser.toNumber()}</span></div>
                    <div><span className='font-bold'>Notes</span> : <span>{observation?.notes}</span></div>
                </div>
            </div>

            <div className='text-center p-10 text-red-600 font-bold'>Are you sure you want to delete the following observation from event {observation?.parent}?</div>

            <div className='flex flex-row gap-5 m-5 justify-start font-normal drop-shadow-2xl content-baseline'>
                <Link href={`/dashboard/graph/${observation?.parent}`}>
                    <Button className='duration-150 hover:shadow-stone-300 hover:shadow-md hover:border-black shadow focus:border-black focus:duration-300 transition-all '>
                        Cancel
                    </Button>
                </Link>

                <form action={deleteObservationById} className='scale-90 ml-auto'>
                    <Button className=' bg-red-600 text-white duration-150 hover:shadow-stone-300 hover:shadow-md hover:border-black shadow focus:border-black focus:duration-300 transition-all  '>
                        Delete
                    </Button>
                </form>
            </div>
        </div>
        </div>

        </div>

</main>
    )
}
