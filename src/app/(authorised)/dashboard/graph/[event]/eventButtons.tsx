'use client'


import { CSVLink } from "react-csv";
import { Observation, GammaEvent } from "@/components/objects/event";
import { Button } from "@/components/ui/button";
import { useRef } from "react";


const EventButtons = ({ event }: { event: GammaEvent }): React.JSX.Element =>{

  const selectedGammaEvent = event
  //creates a reference within the CSVLink element so that it can be manually clicked wehn the user clicks the button
  const csvLink = useRef<CSVLink & HTMLAnchorElement & {link: HTMLAnchorElement}>(null)

  let data: Observation[] = GetObservations(selectedGammaEvent);

  //This function gets the observation fata from imported event and converts into array of observations
  function GetObservations(selectedGammaEvent: GammaEvent) : Observation[] {
    let getData: Observation[] = [];
    selectedGammaEvent.observations.forEach((obs)=>{
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
      getData.push(object);
    })
    return getData;
  }

  //clickcs the CSVLink element when the button gets clicked by the user
  const clickLink = () => {
    csvLink?.current?.link.click();
  }
  
  
  //headers for the csv file that will store the event observation data
  const csvheaders = [
    { label: "Event", key: 'parent'},
    { label: "Time", key: 'time'},
    { label: "Endtime", key: 'endtime'},
    { label: "Duration", key: 'duration'},
    { label: "Frequency", key: 'frequency'},
    { label: "Bandwidth", key: 'bandwidth'},
    { label: "Configuration", key: 'configuration'},
    { label: "Detection", key: 'detection'},
    { label: "Flux", key: 'flux'},
    { label: "Flux Error", key: 'fluxError'},
    { label: "RMS", key: 'RMS'},
    { label: "Notes", key: 'notes'},
    { label: "Observer", key: 'observer'},
    { label: "Burst Advocate", key: 'burstAdvocate'},
    { label: "UserId", key: 'userId'},
    { label: "RA", key: 'RA'},
    {label: "dec", key: 'dec'},
    { label: "posEr", key: 'posEr'}]
  
  
    return(

        

      <div>
        <Button onClick={clickLink}> Download Event as CSV</Button> 
        <CSVLink
            data={data}
            headers={csvheaders}
            filename={selectedGammaEvent.name+".csv"}
            className='hidden'
            ref={csvLink}
            target='_blank'
          >
            
          </CSVLink>
      </div>
    );  
}

export default EventButtons;
