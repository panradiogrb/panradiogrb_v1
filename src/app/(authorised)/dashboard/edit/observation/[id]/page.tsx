
import * as React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { BsDatabaseFillAdd } from "react-icons/bs";
import UpdateObservation from './update-from';
import { Observation, GammaEvent } from "@/components/objects/event";
import { fetchGammaEvents, fetchObservationById, fetchSelectedObservations } from '@/lib/data';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CalculateDuration } from '@/lib/form-helpers';

export default async function EditForm({ params }: { params: { id: string } }) {
    // 1. Retrieve observation id from component params, which is the value passed through the URL (dynamic routing dashboard/edit/observation/[id])
    const { id } = params;

    console.log(`Editing observation ${id}`);

    // 2. Fetch the observation from the database which has the specified id, and pass old observation data to edit form
    let fetchedObservation = null;
    let oldObservation: Observation;

    try {
        // 2.1 Get the old observation record from the database
        fetchedObservation = await fetchObservationById(parseFloat(id));

        // 2.2 Convert the fetched observation data to an Observation type object, to pass to the update form to set default values
        oldObservation = {
            parent: fetchedObservation?.parent ?? "default parent",
            id: fetchedObservation?.observation_id ?? -1,
            time: fetchedObservation?.time ?? new Date(),
            endTime: fetchedObservation?.endtime ?? new Date(),
            duration: CalculateDuration(fetchedObservation?.time ?? new Date(), fetchedObservation?.endtime ?? new Date()),
            frequency: fetchedObservation?.frequency.toNumber() ?? -1,
            bandwidth: fetchedObservation?.bandwidth.toNumber() ?? -1,
            configuration: fetchedObservation?.configuration ?? "default config",
            detection: fetchedObservation?.detection ?? true,   // Default value set to true, which might not be correct
            flux: fetchedObservation?.flux.toNumber() ?? -1,
            fluxError: fetchedObservation?.fluxerror.toNumber() ?? -1,
            RMS: fetchedObservation?.rms.toNumber() ?? -1,
            notes: fetchedObservation?.notes ?? "default notes",
            observer: fetchedObservation?.observer ?? "default observer",
            burstAdvocate: fetchedObservation?.burstadvocate ?? "burst advocate",
            userId: -1,
            RA: fetchedObservation?.ra ?? "default RA",
            dec: fetchedObservation?.dec ?? "default Dec",
            posEr: fetchedObservation?.poser.toNumber() ?? -1,
            dataProcessor: fetchedObservation?.data_processor ?? "default data processor",
            fits: null
        }
    } catch (error) {
        // If fetch observation function returns an error due to database issue, redirect user back to database page
        revalidatePath(`/dashboard/database`);
        redirect(`/dashboard/database`);
    }

    return (
        <main className="bg-custom-image2 bg-no-repeat bg-cover bg-center bg-fixed flex flex-row w-full h-max">
            <div className="h-full mx-8 flex-1 z-10 flex flex-col">
                <h1 className="text-3xl font-base mb-5 mt-8 flex text-white items-center gap-x-5">
                    < BsDatabaseFillAdd size={40} className="rounded-md border-2 border-solid border-white text-white p-2" />UPDATE OBSERVATION
                </h1>
                <div className=" bg-white rounded-2xl  mb-7 drop-shadow-2xl shadow-2xl shadow-black min-h-[600px]  ">
                    <div className=" bg-black rounded-t-lg top-0 w-full h-6 drop-shadow-2xl shadow-2xl shadow-black min-h-6 -translate-y-1"></div>
                    <div>
                        <UpdateObservation oldObservation={oldObservation} />
                    </div>
                </div >
            </div>
        </main>
    )
}