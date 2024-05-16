'use client'
import { BsDatabaseFillAdd } from "react-icons/bs";
import * as React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Observation, GammaEvent, EntryFormErrors } from "@/components/objects/event";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import ObservationForm, { ObservationFormType } from "./entry-form";
import { createEntry } from "@/lib/actions";
import { FormatErrors } from "./tsx-form-helpers";

export default function Entry() {
  const [formCount, setFormCount] = React.useState(0); // State to track the number of forms
  const [newObservations, updateObservations] = React.useState<ObservationFormType[]>([]);
  const formsRef = useRef<ObservationFormType[]>([]); //This is a direct link to the array of observations

  const isInitialRender = useRef(true);

  // ----------------------- INPUT VALIDATION ERROR STATE--------------------------------
  const [entryFormErrorState, setFormErrorState] = useState<EntryFormErrors>({
    success: true,
    databaseErrors: "",
    subformErrors: []
  });

  useEffect(() => {
    // Scroll to top whenever 'entryFormErrorState' changes
    window.scrollTo({ top: 100, behavior: 'smooth' });
  }, [entryFormErrorState]);
  // ------------------------------------------------------------------------------------

  //This use effect is used to update the current version of the formsRef whenever newObservations change.
  useEffect(() => {
    formsRef.current = newObservations;
  }, [newObservations])


  //this useEffect adds the forms to the page. Is run once on loading
  useEffect(() => {
    //dont run on initial render
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    //This useEffect handles the updating of newObservations whenever formCount is incremented
    updateObservations(newObservations => [
      ...newObservations,
      ObservationForm({
        index: formCount,
        updateObservations: updateObservations,
        forms: formsRef,
        isChecked: false,
        handleCheck: handleCheck,
      })
    ]);
  }, [formCount]);

  //This function handles changing the checked value of the detection field within the forms. Its done here because of bad code design.
  function handleCheck(index: number) {
    const updatedForms = formsRef.current.map(obs => {
      if (obs.index === index) {
        console.log(formsRef.current[formsRef.current.indexOf(obs)].checked)
        return {
          ...obs,
          checked: !obs.checked
        };
      }
      return obs;
    });

    updateObservations(updatedForms);
  }

  //This function returns the Element array for all observations in the newObservations array
  function GetObservationsForDisplay(): React.JSX.Element[] {
    let array: React.JSX.Element[] = [];
    newObservations.forEach((observation) => {
      array.push(observation.form)
    })

    return array;
  }


  return (

    <main className="bg-custom-image2 bg-no-repeat bg-cover bg-center bg-fixed flex flex-row w-full h-max">

      <div className="h-full mx-8 flex-1 z-10 flex flex-col">
        <h1 className="text-3xl font-base mb-5 mt-8 flex text-white items-center gap-x-5">
          < BsDatabaseFillAdd size={40} className="rounded-md border-2 border-solid border-white text-white p-2" />ENTRY
        </h1>

        <div className=" bg-white rounded-2xl  mb-7 drop-shadow-2xl shadow-2xl shadow-black min-h-[600px]  ">
          <div className=" bg-black rounded-t-lg top-0 w-full h-6 drop-shadow-2xl shadow-2xl shadow-black min-h-6 -translate-y-1 "></div>

          <div
            className=
            {
              entryFormErrorState.success === false
                ?
                'bg-red-200 rounded m-3 mb-2 p-3 border-solid border-[3px] border-red-400 scale-100 transition-all'
                :
                'scale-0 transition-all'
            }
          >
            {/* Displaying input validation errors whenever user tries to submit an invalid form */}
            {
              entryFormErrorState.subformErrors.length > 0
                ?
                FormatErrors(entryFormErrorState, true)
                :
                <></>
            }
          </div>

          {/* Instead of handleSubmit, call server action 'createEntry' and set return value to entryFormErrorState, to list out any input validation errors at bottom of form */}
          <form action={async (formData) => {
            const { success, databaseErrors, subformErrors } = await createEntry(formData);
            setFormErrorState({ success: success, databaseErrors: databaseErrors, subformErrors: subformErrors })
          }} className="flex flex-col">
            <div className="w-full flex flex-row  text-black h-20 " >

              <div className="flex items-center ">
                <div className=''>

                  <label className="mx-8 font-bold text-gray-800" htmlFor="event">
                    Event Name:
                  </label>
                  <input
                    type="text"
                    name="event"
                    id="event"
                    placeholder="Event Name"
                    className="  bg-white drop-shadow  duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md px-3 py-2 mr-2 focus:outline-none w-96 h-14 text-black border placeholder-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* The bellow function is used to get all the React.JSX.Element objects from the array*/}
            {GetObservationsForDisplay()}

            <div className="flex my-4 justify-center">
              <Button
                onClick={() => {
                  //There is a useEvent loop that runs whenever formCount is updated. This loop is what adds a new form to the array
                  setFormCount(prevCount => prevCount + 1);
                }}
                type="button"
                className="text-white drop-shadow-xl bg-blue-600 w-full"
              >
                New Observation
              </Button>
            </div>

            <div className="flex my-4 mb-6 ml-8 ">
              <Button
                type="submit"
                className="text-white  drop-shadow-xl bg-blue-600 w-40">
                Submit
              </Button>
            </div>

          </form>
        </div>
        <div className="flex  bg-white bottom-0 mt-1 w-full h-1 my-6  "></div>

      </div>
    </main>

  );
}
