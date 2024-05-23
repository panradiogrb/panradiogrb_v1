'use client'
import { BsDatabaseFillAdd } from "react-icons/bs";
import * as React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Observation, GammaEvent, EntryFormErrors } from "@/components/objects/event";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import ObservationForm, { ObservationFormType } from "./observation-form";
import { createEntry } from "@/lib/actions";
import { FormatErrors } from "../tsx-form-helpers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { Checkbox } from "@mui/material";
import { CreateSubmitButton } from "@/components/buttons/entry-form-submit-btn";

export default function CreateEntryForm({
    events,
}: {
    events: {
        name: string;
        date: Date;
        creator: string;
    }[];
}) {
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

    // ----------------------- EVENT NAME FIELD STATE -------------------------------------
    const [isNewEvent, setIsNewEvent] = useState(true);     // This state is changed by the 'new event checkbox' to keep track of whether user is adding observations to an existing event or not
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


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

                    {/* INPUT VALIDATION ERROR SECTION */}
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

                    {/* CREATE ENTRY FORM */}
                    {/* Instead of handleSubmit, call server action 'createEntry' and set return value to entryFormErrorState, to list out any input validation errors at bottom of form */}
                    <form action={async (formData) => {
                        const { success, databaseErrors, subformErrors } = await createEntry(formData);
                        setFormErrorState({ success: success, databaseErrors: databaseErrors, subformErrors: subformErrors })
                    }} className="flex flex-col">

                        {/* EVENT FORM FIELDS */}
                        <div className="w-full flex flex-row text-black border-b-2 h-full py-5">
                            {/* NEW EVENT CHECKBOX */}
                            <div className="self-center mx-8">
                                <ul className="flex items-center flex-row">
                                    <li className="flex items-center">
                                        <label htmlFor="new-event-checkbox" className="font-bold text-gray-800 inline-flex">
                                            New Event:
                                        </label>
                                    </li>
                                    <li className="flex items-center ">
                                        <Checkbox
                                            defaultChecked={isNewEvent}
                                            color="success"
                                            name={"new-event-checkbox"}
                                            onChange={() => setIsNewEvent(!isNewEvent)}
                                        />
                                    </li>
                                </ul>
                            </div>
                            
                            {/* EVENT NAME */}
                            {isNewEvent ? (
                            <div className="">
                                <ul className="flex items-center">
                                    <li className="flex items-center">
                                        <label className="mx-8 font-bold text-gray-800" htmlFor="new-event">
                                            <span className="text-red-500">*</span> New Event Name:
                                        </label>
                                    </li>
                                    <li>
                                        <input
                                            type="text"
                                            name="new-event"
                                            id="event"
                                            placeholder="New Event Name"
                                            className="bg-white drop-shadow duration-150 hover:shadow-stone-300 hover:shadow-sm  hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md px-3 py-2 mr-2 focus:outline-none w-96 h-14 text-black border placeholder-gray-500"
                                        />
                                    </li>
                                </ul>
                            </div>
                            ) : (
                                <div className="">
                                    <ul className="flex items-center">
                                        <li className="flex items-center">
                                            <label className="mx-8 font-bold text-gray-800" htmlFor="existing-event">
                                                <span className="text-red-500">*</span> Select Existing Event:
                                            </label>
                                        </li>
                                        <li>
                                            <select
                                                id="existing-event"
                                                name="existing-event"
                                                className="bg-white drop-shadow duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md px-3 py-2 ml-4 focus:outline-none w-96 h-14 text-black border placeholder-gray-500"
                                            >
                                                <option disabled selected>Select an existing event</option>
                                                {events.map((event, index) => (
                                                    <option key={index} value={event.name}>
                                                        {event.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </li>
                                    </ul>
                                </div>
)}
                        </div>

                            {/* NEW EVENT DETAILS */}

                            {isNewEvent ? (
                            <div className="w-full flex flex-row text-black border-b-2 border-t-2 h-full py-5">

                                <div className="flex flex-row items-center justify-between ">
                                  

                                    {/* EVENT DATE */}
                                    <div className="flex items-center">
                                        <ul className="flex items-center">
                                            <li className="flex items-center">
                                                <label className="mx-8 font-bold text-gray-800" htmlFor="new-event-date">
                                                    <span className="text-red-500">*</span> New Event Date:
                                                </label>
                                            </li>
                                            <li>
                                                <div className="border rounded-md">
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            format="DD/MM/YYYY"
                                                            name="new-event-date"
                                                            label="Event Date"
                                                            className="bg-white drop-shadow duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md border"
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* EVENT TIME */}
                                    <div className="flex items-center">
                                        <ul className="flex items-center">
                                            <li className="flex items-center">
                                                <label className="mx-8 font-bold text-gray-800" htmlFor="new-event-time">
                                                    <span className="text-red-500">*</span> New Event Time:
                                                </label>
                                            </li>
                                            <li>
                                                <div className="border rounded-md">
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <TimeField
                                                            format="HH:mm:ss"
                                                            ampm={false}
                                                            label="Event Time"
                                                            name="new-event-time"
                                                            className="bg-white drop-shadow duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md"
                                                            InputLabelProps={{ required: false }}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                                        </div>

                            ) : null
                            }

                        {/* GENERATION OF OBSERVATION SUBFORMS SECTION */}

                        {/* The bellow function is used to get all the React.JSX.Element objects from the array*/}
                        {GetObservationsForDisplay()}

                        {/* CREATE FORM BUTTONS SECTION */}
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
                            <CreateSubmitButton />
                        </div>

                    </form>
                </div>
                <div className="flex  bg-white bottom-0 mt-1 w-full h-1 my-6  "></div>

            </div>
        </main>

    );
}
