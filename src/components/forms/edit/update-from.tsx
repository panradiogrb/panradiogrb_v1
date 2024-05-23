
'use client'

import * as React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import Checkbox from '@mui/material/Checkbox';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';//https://mui.com/x/react-date-pickers/date-picker/
import { TimeField } from '@mui/x-date-pickers/TimeField'; //https://mui.com/x/react-date-pickers/
import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea" //https://ui.shadcn.com/docs/components/textarea 
import dayjs, { Dayjs } from 'dayjs';
import { Observation, GammaEvent } from "@/components/objects/event";
import Link from 'next/link';
import { updateObservation } from '@/lib/actions';
import { EntryFormErrors } from '@/components/objects/event';
import { FormatErrors } from '../tsx-form-helpers';
import { EditSubmitButton } from '@/components/buttons/update-form-submit-btn';


const UpdateObservation = ({ oldObservation }: { oldObservation: Observation }): React.JSX.Element => {

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

    // ----------------------- DETECTION STATE FOR RED ASTERISK ---------------------------
    const [isChecked, setIsChecked] = useState(oldObservation.detection);

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(!isChecked);
    };
    // ------------------------------------------------------------------------------------

    // Bind default 'updateObservation' server action with the observation id, and set form to use 'updateObservationWithId' instead, so update server action can update the correct observation record
    const updateObservationWithId = updateObservation.bind(null, oldObservation.id);

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    /*********************
     * UPDATE FORM START
     *********************/
    let form = (
        <form action={async (formData) => {
            const { success, databaseErrors, subformErrors } = await updateObservationWithId(formData);
            setFormErrorState({ success: success, databaseErrors: databaseErrors, subformErrors: subformErrors });
        }} className="flex flex-col">

            {/* Redirects user back to observation's parent event page */}
            {/* <div className="flex my-4 ml-8 ">
                <Link href={`/dashboard/graph/${oldObservation.parent}`}
                >
                    <Button className=" bg-white drop-shadow rounded-md focus:outline-none w-20  text-black border duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all ">
                        < IoIosArrowRoundBack size={50} className=" text-black p-2" />
                    </Button>
                </Link>
            </div> */}

            {/* Displaying input validation errors whenever user tries to submit an invalid form */}
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
                        FormatErrors(entryFormErrorState, false)
                        :
                        <></>
                }
            </div>

            {/* BEGINNING OF UPDATE FORM */}
            <div >
                {/*LINE 1*/}
                <div className="w-full flex flex-row  text-black border-b-2   h-full py-5 ">

                    {/* Observer */}

                    <ul className="flex items-center">
                        <li>
                            <label
                                className="font-bold text-gray-800 mx-8"
                                htmlFor="Observer">
                                Observer:
                            </label>
                        </li>
                        <div className=' hover:drop-shadow-md'>
                            <li>
                                <input
                                    type="text"
                                    name={`observer`}
                                    id="observer"
                                    placeholder='Full Name'
                                    defaultValue={oldObservation.observer}
                                    data-testid="observer-input"
                                    // onChange={handleChange}
                                    className="  bg-white drop-shadow rounded-md px-3 py-2 mr-2 focus:outline-none w-56 h-14 text-black border duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all " />

                            </li>
                        </div>
                    </ul>


                    {/* BURST ADVOCATE */}
                    <ul className="flex items-center">
                        <li>
                            <label
                                className="font-bold text-gray-800 mx-8"
                                htmlFor="Advocate">
                                Burst Advocate:
                            </label>
                        </li>
                        <div className=' hover:drop-shadow-md'>

                            <li>
                                <input
                                    type="text"
                                    name={`burstAdvocate`}
                                    id="advocate"
                                    placeholder='Full Name'
                                    defaultValue={oldObservation.burstAdvocate}
                                    // onChange={handleChange}
                                    className="  bg-white drop-shadow rounded-md px-3 py-2 mr-2 focus:outline-none w-56 h-14 text-black border duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all " />
                            </li>
                        </div>

                    </ul>

                    {/* Data Processor */}
                    <ul className="flex items-center">
                        <li>
                            <label
                                className="font-bold text-gray-800 mx-8"
                                htmlFor="rms">
                                Data Processor:
                            </label>
                        </li>
                        <div className=' hover:drop-shadow-md'>

                            <li>
                                <input
                                    type="text"
                                    name={`dataProcessor`}
                                    id="dataProcessor"
                                    placeholder='Data Processor'
                                    defaultValue={oldObservation.dataProcessor}
                                    // onChange={handleChange}
                                    className="  bg-white drop-shadow rounded-md px-3 py-2 mr-2 focus:outline-none w-56 h-14 text-black border duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all " />
                            </li>
                        </div>

                    </ul>

                </div>


                {/* LINE TWO */}
                <div className="w-full flex flex-row border-b-2 h-full py-5 text-black">
                    <div className=''>
                        <ul className="flex items-center">
                            {/* CONFIGURATION */}
                            <li>
                                <label
                                    className="font-bold text-gray-800 mx-8"
                                    htmlFor="rms">
                                    Configuration:
                                </label>
                            </li>
                            <div className=' hover:drop-shadow-md'>

                                <li>
                                    <input
                                        type="text"
                                        name={`configuration`}
                                        id="configuration"
                                        defaultValue={oldObservation.configuration}
                                        // onChange={handleChange}
                                        placeholder='Telescope Configuration'
                                        className=" bg-white drop-shadow rounded-md px-3 py-2 mr-2 w-56 h-14   text-black focus:outline-none border duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all " >
                                    </input>
                                </li>
                            </div>
                        </ul>

                    </div>
                </div>

                {/* LINE 3 */}
                <div className="w-full flex flex-row border-b-2 h-full py-5 text-black">

                    <ul className="flex items-center flex-col gap-6 content-center gap-y-4">

                        <li className="flex flex-row gap-x-28 w-full">
                            {/* START DATE */}
                            <div className=''>

                                <div className="flex items-center ">
                                    <label
                                        className="font-bold text-gray-800 mx-8 "
                                        htmlFor="startDate">
                                        <span className="text-red-500">*</span> Start Date:
                                    </label>
                                    <div className=' hover:drop-shadow-xl  '>

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                name={`startDate`}
                                                label="Start Date"
                                                defaultValue={dayjs(oldObservation.time)}
                                                // onChange={handleDateChange}
                                                className='bg-white drop-shadow-md '

                                            />
                                        </LocalizationProvider>
                                    </div>

                                </div>
                            </div>

                            {/* START TIME */}
                            <div className=''>

                                <div className='flex items-center'>
                                    <label
                                        className="font-bold text-gray-800 mx-8 self-center"
                                        htmlFor="startTime">
                                        <span className="text-red-500">*</span> Start Time:
                                    </label>
                                    <div className=' hover:drop-shadow-xl  '>


                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimeField
                                                required={true}
                                                format="HH:mm:ss"
                                                ampm={false}
                                                label="Start Time"
                                                name={`startTime`}
                                                defaultValue={dayjs(oldObservation.time.getTime())}
                                                className='bg-white drop-shadow-md rounded-md '
                                                InputLabelProps={{ required: false }}
                                            />
                                        </LocalizationProvider>
                                    </div>


                                </div>
                            </div>

                        </li>

                        <li className="flex flex-row gap-x-28 w-full">
                            {/* END DATE */}
                            <div className=''>
                                <div className="flex items-center">
                                    <label
                                        className="font-bold text-gray-800 mx-8 mr-[41.25px] <-- this-is-from-painstaking-calculations-so-the-two-tags-are-the-same-size.-this-comment-also-applies-for-the-lower-random-exact-px-value-on-line-+15-from-here"
                                        htmlFor="endDate">
                                        End Date:
                                    </label>
                                    <div className=' hover:drop-shadow-xl'>

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                defaultValue={dayjs(oldObservation.endTime)}
                                                label="End Date"
                                                name='endDate'

                                                className='bg-white drop-shadow-md rounded-md'
                                            />
                                        </LocalizationProvider>
                                    </div>

                                </div>
                            </div>

                            {/* END TIME */}
                            <div className=''>

                                <div className='flex items-center'>
                                    <label
                                        className="font-bold text-gray-800 mx-8 mr-[41.27px]"
                                        htmlFor="endTime">
                                        End Time:
                                    </label>
                                    <div className=' hover:drop-shadow-xl'>

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimeField
                                                ampm={false}
                                                format="HH:mm:ss"
                                                label="End Time"
                                                // required={true}
                                                name={`endTime`}
                                                defaultValue={dayjs(oldObservation.endTime.getTime())}
                                                className='bg-white drop-shadow-md rounded-md '
                                                InputLabelProps={{ required: false }}
                                            />
                                        </LocalizationProvider>
                                    </div>

                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* LINE 4 */}
                <div className="w-full flex flex-row border-b-2 h-full py-5 text-black">

                    {/* FREQUENCY */}

                    <ul className="flex items-center">

                        <ul className="flex items-center">
                            <li>
                                <label
                                    className="font-bold text-gray-800 mx-8"
                                    htmlFor="frequency">
                                    <span className="text-red-500">*</span> Frequency (GHz):
                                </label>
                            </li>
                            <div className=' hover:drop-shadow-md'>
                                <li>
                                    <input
                                        type="text"
                                        name={`frequency`}
                                        id="frequency"
                                        placeholder='Frequency'
                                        // onChange={handleChange}
                                        defaultValue={oldObservation.frequency}
                                        className=" bg-white drop-shadow rounded-md px-3 py-2 mr-2 focus:outline-none w-56 h-14 text-black border duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all " />
                                </li>
                            </div>
                        </ul>
                        <li>
                            <label
                                className="font-bold text-gray-800 mx-8"
                                htmlFor="frequency">
                                <span className="text-red-500">*</span> Bandwidth (GHz):
                            </label>
                        </li>
                        <div className=' hover:drop-shadow-md'>
                            <li>
                                <input
                                    type="text"
                                    name={`bandwidth`}
                                    id="bandwidth"
                                    placeholder='Bandwidth'
                                    // onChange={handleChange}
                                    defaultValue={oldObservation.bandwidth}
                                    className="  bg-white drop-shadow rounded-md px-3 py-2 mr-2 focus:outline-none w-56 h-14 text-black border duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all " />
                            </li>
                        </div>


                        {/* DETECTION */}
                        <div className='mx-8'>
                            <label
                                className="font-bold text-gray-800 "
                                htmlFor="detection">
                                Detection:
                            </label>

                            <Checkbox
                                {...label}
                                defaultChecked={oldObservation.detection}
                                color="success"
                                name={`detection`}
                                onChange={handleCheckboxChange}
                                data-testid="detection-input"
                            >
                            </Checkbox>
                        </div>
                    </ul>


                </div>

                {/* LINE 5 */}
                <div className="w-full flex flex-row border-b-2 h-full py-5 text-black">
                    <div className="flex items-center">

                        {/* FLUX DENSITY */}

                        <ul className="flex items-center">
                            <li>
                                <label
                                    className="font-bold text-gray-800 mx-8"
                                    htmlFor="flux density">
                                    {isChecked && <span className="text-red-500">*</span>} Flux Density (µJy):
                                </label>
                            </li>
                            <div className=' hover:drop-shadow-md'>
                                <li>
                                    <input
                                        type="text"
                                        name={`flux`}
                                        id="flux"
                                        placeholder='Flux Density'
                                        // onChange={handleChange}

                                        defaultValue={oldObservation.flux}
                                        className=" bg-white drop-shadow rounded-md px-3 py-2 mr-2 focus:outline-none w-56 h-14 text-black border duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all "
                                    />
                                </li>
                            </div>
                        </ul>


                        {/* FLUX DENSITY ERROR */}
                        <ul className="flex items-center">
                            <li>
                                <label
                                    className="font-bold text-gray-800 mx-8"
                                    htmlFor="uncertainty">
                                    {isChecked && <span className="text-red-500">*</span>} Flux Density Error (µJy):
                                </label>
                            </li>
                            <div className=' hover:drop-shadow-md'>

                                <li>
                                    <input
                                        type="text"
                                        name={`fluxError`}
                                        id="uncertainty"
                                        placeholder='Flux Density Error'
                                        // onChange={handleChange}
                                        data-testid="fluxError-input"
                                        defaultValue={oldObservation.fluxError}
                                        className="  bg-white drop-shadow rounded-md px-3 py-2 mr-2 focus:outline-none w-56 h-14 text-black border duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all " />

                                </li>
                            </div>

                        </ul>



                    </div>
                </div>

                {/* LINE 6 */}
                <div className="w-full flex flex-row border-b-2 h-full py-5 text-black">
                    <div className="flex items-center">

                        {/* RMS */}
                        <label
                            className="font-bold text-gray-800 mx-8"
                            htmlFor="rms">
                            RMS (µJy):
                        </label>
                        <div className=' hover:drop-shadow-md'>

                            <input
                                type="text"
                                name={`RMS`}
                                id="rms"
                                placeholder='RMS'
                                defaultValue={oldObservation.RMS}
                                // onChange={handleChange}

                                className="bg-white drop-shadow rounded-md px-3 py-2 mr-2 focus:outline-none w-56 h-14 text-black border duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all " />
                        </div>

                    </div>
                </div>


                {/* LINE 7 */}
                <div className='w-full h-full border-b-2 py-5'>
                    <ul className='flex'>
                        <li className="flex flex-row">

                            {/* RA */}

                            <label
                                className='font-bold text-gray-800 mx-8 self-center'
                                htmlFor='RA'>
                                RA (hh:mm:ss.ss):
                            </label>
                            <div className=' hover:drop-shadow-md'>

                                <input
                                    type='text'
                                    name={`RA`}
                                    id='RA'
                                    placeholder='RA'
                                    defaultValue={oldObservation.RA}
                                    // onChange={handleChange}
                                    className=" bg-white drop-shadow rounded-md px-3 py-2 mr-2 focus:outline-none w-36 h-14 text-black border duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all ">
                                </input>
                            </div>
                        </li>
                        <div className=''>

                            <li className="flex flex-row">

                                {/* DEC */}
                                <label
                                    className='font-bold text-gray-800 mx-8 self-center'
                                    htmlFor='Dec'>
                                    Dec (dd:mm:ss.ss):
                                </label>
                                <div className=' hover:drop-shadow-md'>
                                    <input
                                        type='text'
                                        name={`dec`}
                                        id='dec'
                                        placeholder='Dec'
                                        defaultValue={oldObservation.dec}
                                        // onChange={handleChange}
                                        className=" bg-white drop-shadow rounded-md px-3 py-2 mr-2 focus:outline-none w-36 h-14 text-black border duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all ">
                                    </input>
                                </div>
                            </li>
                        </div>


                        {/* POSITION ERROR */}
                        <div className=''>

                            <li className="flex flex-row">
                                <label
                                    className='font-bold text-gray-800 mx-8 self-center'
                                    htmlFor='posEr'>
                                    Positional Error (arcsec):
                                </label>
                                <div className=' hover:drop-shadow-md'>

                                    <input
                                        type='text'
                                        name={`posEr`}
                                        id='posEr'
                                        placeholder='Position Error'
                                        defaultValue={oldObservation.posEr}
                                        // onChange={handleChange}
                                        data-testid='posEr-input'
                                        className=" bg-white drop-shadow rounded-md px-3 py-2 mr-2 focus:outline-none w-36 h-14 text-black border duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all ">
                                    </input>
                                </div>

                            </li>
                        </div>

                    </ul>
                </div>
                {/* LINE 8 */}
                <div className="w-full flex flex-row h-full py-5 border-b-2 text-black">
                    <div className="flex items-center">

                        {/* NOTES */}

                        <label
                            className="font-bold text-gray-800 mx-8"
                            htmlFor="notes">
                            Notes:
                        </label>
                        <div className=' hover:drop-shadow-md '>

                            <Textarea placeholder="Anything of note..." name={`notes`} id="notes" defaultValue={oldObservation.notes} className=" bg-white drop-shadow rounded-md px-3 py-2 mr-2 focus:outline-none w-96 h-14 text-black border duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all "
                                style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.01)' }}



                            />

                        </div>
                    </div>
                </div>

                {/* LINE 9 */}
                <div className="w-full flex flex-row h-full py-5 text-black">
                    <div className='flex items-center'>

                        {/* FITS FILE SELECTION */}
                        <label
                            className='font-bold text-gray-800 mx-8'
                            htmlFor='fits'>
                            .fits Image:
                        </label>
                        <div className="justify-center content-center flex px-3 py-2">
                            <input
                                name={`fits`}
                                type="file"
                                className=" text-sm text-stone-500
                                        file:mr-5 file:py-1 file:px-3 file:border-[1px] file:rounded-md
                                        file:text-xs 
                                        file:bg-stone-50 file:text-stone-700
                                        hover:file:cursor-pointer hover:file:bg-blue-50
                                        hover:file:text-blue-700
                                        file:transition-all transition-all"

                                accept=".fit, .fits"
                                defaultValue={oldObservation.fits?.name}>
                            </input>
                        </div>
                    </div>
                </div >


            </div >

            <div className='flex flex-row justify-between m-5 px-10'>
                <div className="m-left ">
                    <EditSubmitButton />

                    {/* {messageVisible && <div className='flex  ml-8 text-green-500'>Observation Updated!</div>} */}


                </div>

                <div className="m-right ">
                    <Link href={`/dashboard/graph/${oldObservation.parent}`}
                    >
                        <Button className=" bg-white rounded-md drop-shadow hover:drop-shadow-md ">
                            Cancel
                        </Button>
                    </Link>
                </div>

            </div >



        </form >

    )
    return form
};


export default UpdateObservation;