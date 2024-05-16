'use client'

import { BsGraphUp } from "react-icons/bs";
import { GammaEvent } from "@/components/objects/event";
import { Observation } from "@/components/objects/event";
import { GetGammaEvent } from "@/components/objects/event"
import GraphController from "@/components/ui/graph/graph-controller";
import { CSVLink, CSVDownload} from "react-csv";


import { Button } from "@/components/ui/button";
import { RiCalendarEventFill } from "react-icons/ri";

export default async function Graph() {
  let event: GammaEvent = await GetGammaEvent();

  let graphController = (<GraphController event={event}></GraphController>);

  let data: Observation[] = [];
  event.observations.forEach((obs)=>{
    let object = {
      parent: obs.parent,
      id: obs.id,
      time: obs.time,
      endTime: obs.endTime,
      duration: obs.duration,
      frequency: obs.frequency,
      bandwidth: obs.bandwidth,
      configuration: obs.configuration,
      detection: obs.detection,
      flux: obs.flux,
      fluxError: obs.fluxError,
      RMS: obs.RMS,
      notes: obs.notes,
      observer: obs.observer,
      burstAdvocate: obs.burstAdvocate,
      userId: obs.userId,
      RA: obs.RA,
      dec: obs.dec,
      posEr: obs.posEr,
      fits: null
    }
    data.push(object);
  })


  /*
    GraphController
    --------
    Goodluck! :D

    doc to follow - 29/04/2024
  */


    const csvheaders = [
      { label: "parent", key: 'parent'},
      { label: "time", key: 'time'},
      { label: "endtime", key: 'endtime'},
      { label: "duration", key: 'duration'},
      { label: "frequency", key: 'frequency'},
      { label: "bandwidth", key: 'bandwidth'},
      { label: "configuration", key: 'configuration'},
      { label: "detection", key: 'detection'},
      { label: "flux", key: 'flux'},
      { label: "flux Error", key: 'fluxError'},
      { label: "RMS", key: 'RMS'},
      { label: "notes", key: 'notes'},
      { label: "observer", key: 'observer'},
      { label: "burst Advocate", key: 'burstAdvocate'},
      { label: "userId", key: 'userId'},
      { label: "RA", key: 'RA'},
      {label: "dec", key: 'dec'},
      { label: "posEr", key: 'posEr'}]

  return (
    <main className="bg-custom-image2 bg-no-repeat bg-cover bg-center bg-fixed flex flex-row w-full h-max">

      <div className="h-full mx-8 flex-1 z-10 flex flex-col">
        <h1 className="text-3xl font-base mb-5 mt-8 flex text-white items-center gap-x-5">
          <RiCalendarEventFill size={40} className="rounded-md border-2 border-solid border-white text-white p-2"></RiCalendarEventFill> EVENT INFORMATION
        </h1>


        <div className="flex-1 bg-white rounded-xl flex flex-col mb-7 drop-shadow-2xl shadow-2xl shadow-black">
          <div className=" bg-black rounded-t-lg top-0 w-full h-6 drop-shadow-2xl shadow-2xl shadow-black"></div>

          <h1 className="text-black text-center text-3xl font-bold py-4">
            {event.name} - {event.date.toLocaleTimeString()} - {event.date.toDateString()}
          </h1>

          {graphController}
          

          <div className='flex flex-row gap-5 m-5 justify-start font-normal drop-shadow-2xl content-baseline'>
            <Button>
              Edit Event
            </Button>
            <Button>
              Download Event as CSV
            </Button>
            <Button
              className='bg-red-100 scale-90 ml-auto'
              >
              Delete Event
            </Button>
          </div>
        </div>
        <CSVLink
          data={data}
          headers={csvheaders}
          filename={event.name+".csv"}
        > 
          Download CSV
        </CSVLink>
      </div>
    </main>
  );
}

