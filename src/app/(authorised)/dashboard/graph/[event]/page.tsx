/**
 * Graph() COMPONENT DESCRIPTION
 * This page displays data for an individual event, which is specific by the dynamic route "graph/[event]"
 * The value passed in place of [event] in the URL will be received as a prop by the Graph() component, to be used to fetch the corresponding event data
 */

import { BsGraphUp } from "react-icons/bs";
import { Observation, GammaEvent } from "@/components/objects/event";
import { GetGammaEvent } from "@/components/objects/event"
import GraphController from "@/components/ui/graph/graph-controller";
import { Button } from "@/components/ui/button";
import Link from 'next/link'
import { fetchSelectedEvent, fetchSelectedObservations } from "@/lib/data";
import EventButtons from "./eventButtons";
import readUserSession from "@/lib/auth";
import { getUserRole } from "@/lib/authActions/actions";
import { CalculateDuration } from "@/lib/form-helpers";

export default async function Graph({ params }: { params: { event: string } }) {
  /****************************************************************
   * GAMMA EVENT OBJECT CONSTRUCTION USING DATABASE FETCH METHODS
   ****************************************************************/
  // 1. First retrieve the corresponding event object from the database
  const selectedEvent = await fetchSelectedEvent(params.event);

  // 2. After selectedEvent has been received, use selectedEvent.name to retrieve selectedEvent's observation records
  let selectedObservations = null;
  if (selectedEvent != null) {
    selectedObservations = await fetchSelectedObservations(selectedEvent.name);
  } else {
    console.error(`\nERROR: graph/[event]/page.tsx:\nSelected event '${params.event}' was not found. Observation searched stopped.`);
  }

  // 3. Initialize an empty GammaEvent object to be passed to graph controller if selected event is not found
  let selectedGammaEvent: GammaEvent = {
    name: "EVENT NOT FOUND",
    date: new Date(),
    creator: "",
    observations: []
  };

  // 4. If both the selectedEvent and selectedObservations are successfully retrieved, construct a GammaEvent type object to pass to graphController for data visualization
  if (selectedEvent != null && selectedObservations != null) {
    selectedGammaEvent = {
      name: selectedEvent.name,
      date: selectedEvent.date,
      creator: selectedEvent.creator,
      observations: selectedObservations.map((o) => {
        // Map over each 'selectedObservation' object, and create a corresponding 'Observation' type object to be returned into GammaEvent observations array field

        let placeholderEndDate: Date = new Date(o.time);
        placeholderEndDate.setHours(placeholderEndDate.getHours() + 12);

        // console.log('\n');
        // console.log(`Observation Start Time: ${o.time.toString()}`)
        // console.log(`Modified Observation End Time: ${placeholderEndDate.toString()}`)

        const observation: Observation = {
          id: o.observation_id,
          parent: o.parent,
          time: o.time,
          endTime: o.endtime === null ? placeholderEndDate : o.endtime,
          detection: o.detection,
          duration: o.endtime === null || o.duration.toNumber() === -1 ? CalculateDuration(o.time, placeholderEndDate) : parseFloat(o.duration.toString()),
          RMS: parseFloat(o.rms.toString()),
          frequency: parseFloat(o.frequency.toString()),
          flux: parseFloat(o.flux.toString()),
          fluxError: parseFloat(o.fluxerror.toString()),
          notes: o.notes,
          bandwidth: parseFloat(o.bandwidth.toString()),
          configuration: o.configuration,
          observer: o.observer,
          burstAdvocate: o.burstadvocate,
          userId: 1, // THIS NEEDS TO BE CHANGED TO USER ID OF LOGGED IN USER FROM SUPABASE CLIENT
          RA: o.ra,
          dec: o.dec,
          posEr: parseFloat(o.poser.toString()),
          fits: null
        }

        return observation;
      })
    };
  }

  // 5. Before rendering, retrieve logged in user role to pass to graph controller, to dynamically render edit/delete functionality
  const session = await readUserSession();
  //console.log(session)
  let userRole: string | null = null;

  if (session.data.user) {
    const roleResult = await getUserRole(session.data.user.id)
    userRole = roleResult.role;
  }
  // console.log(`Event page: User Role = ${userRole}`)

  /****************************************************************
   * SET GRAPH CONTROLLER WITH CONSTRUCTED GAMMA EVENT OBJECT
   ****************************************************************/
  // let graphController = (<GraphController event={event}></GraphController>);
  let graphController = (<GraphController event={selectedGammaEvent} userRole={userRole}></GraphController>);
  let eventButtons = (<EventButtons event={selectedGammaEvent}></EventButtons>)


  /*
    need a parent 'graphpage widgets' component that can have 'use client'. page will just display that component

    the idea is that the the buttons are in the same level as the graph visual so when they are clicked, they can pull
    an updated value from the table and set a variable to this new value. Then, the change in this value will cause 
    a useEffect or useState to triger a rerender of the graph with the new information.
    To do this, they must all be client components. So, I'll have this client component be passed the information for
    the graph and tables from the server component in the page.tsx file here. That way we can use await and asynchrously
    retrieve the data.
  */

  return (
    <main className="bg-custom-image2 bg-no-repeat bg-cover bg-center bg-fixed flex flex-row w-full h-max">

      <div className="h-full px-4 flex-1 z-10 flex flex-col">
        <h1 className="text-3xl font-base mb-5 mt-8 flex text-white items-center gap-x-5">
          <BsGraphUp size={40} className="rounded-md border-2 border-solid border-white text-white p-2"></BsGraphUp>{selectedGammaEvent.name}
        </h1>


        <div className="flex-1 bg-white rounded-xl flex flex-col mb-7 drop-shadow-2xl shadow-2xl shadow-black">
          <div className=" bg-black rounded-t-lg top-0 w-full h-6 drop-shadow-2xl shadow-2xl shadow-black"></div>

          <h1 className="text-black text-center text-3xl font-bold py-4">
            {selectedGammaEvent?.name} - {selectedGammaEvent?.date.toLocaleTimeString()} - {selectedGammaEvent?.date.toDateString()}
          </h1>

          {/* Graph Controller render */}
          {graphController}

          <div className='flex flex-row gap-5 m-5 justify-start font-normal drop-shadow-2xl content-baseline'>
            {/* Commented out for now because Edit Event functionality is not built */}
            {/* <Button>
              Edit Event
            </Button> */}

            {/* Event buttons render */}
            {eventButtons}

            {/* Delete Event */}
            {userRole === 'researcher' && (
              <Link className='scale-90 ml-auto' href={`/dashboard/delete/event/${selectedGammaEvent.name}`}>
                <Button className="bg-red-600 text-white ">
                  Delete Event
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}