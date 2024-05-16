
'use client'

import * as React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import Checkbox from '@mui/material/Checkbox';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';//https://mui.com/x/react-date-pickers/date-picker/
import { TimeField } from '@mui/x-date-pickers/TimeField'; //https://mui.com/x/react-date-pickers/
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea" //https://ui.shadcn.com/docs/components/textarea 


export type ObservationFormType = {
    index: number;
    form: React.JSX.Element;
    checked: boolean;
}

export interface ObservationFormProps {
    index: number,
    updateObservations: React.Dispatch<React.SetStateAction<ObservationFormType[]>>,
    forms: React.MutableRefObject<ObservationFormType[]>,
    isChecked: boolean,
    handleCheck: (index: number) => (void)
}

const ObservationForm = ({ index, isChecked, handleCheck, updateObservations, forms }: ObservationFormProps): ObservationFormType => {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    let form = (
        <div key={`key${index}`}>
            {/* TITLE */}
            <div className='text-2xl font-semibold border-t-8 py-8'>
                <h1 className='mx-8'>Observation {index + 1}</h1>
            </div>

            {/*LINE 1*/}
            <div className="w-full flex flex-row  text-black border-b-2  border-t-2 h-full py-5">

                {/* Observer */}
                <div className=''>
                    <ul className="flex items-center">
                        <li>
                            <label
                                className="font-bold text-gray-800 mx-8"
                                htmlFor="Observer">
                                Observer:
                            </label>
                        </li>
                        <li>
                            <input
                                type="text"
                                name={`observer${index}`}
                                id="observer"
                                placeholder='Full Name'
                                className="  bg-white drop-shadow  duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md px-3 py-2 mr-2 focus:outline-none w-56 h-14 text-black border placeholder-gray-500" />

                        </li>
                    </ul>

                </div>
                {/* BURST ADVOCATE */}
                <div className=''>
                    <ul className="flex items-center">
                        <li>
                            <label
                                className="font-bold text-gray-800 mx-8"
                                htmlFor="Advocate">
                                Burst Advocate:
                            </label>
                        </li>
                        <li>
                            <input
                                type="text"
                                name={`advocate${index}`}
                                id="advocate"
                                placeholder='Full Name'
                                className="  bg-white drop-shadow  duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md px-3 py-2 mr-2 focus:outline-none w-56 h-14 text-black border placeholder-gray-500" />
                        </li>
                    </ul>
                </div>

                {/* Data Processor */}
                <div className=''>
                    <ul className="flex items-center">
                        <li>
                            <label
                                className="font-bold text-gray-800 mx-8"
                                htmlFor="rms">
                                Data Processor:
                            </label>
                        </li>
                        <li>
                            <input
                                type="text"
                                name={`dataProcessor${index}`}
                                id="dataProcessor"
                                placeholder='Full Name'
                                className="  bg-white drop-shadow  duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md px-3 py-2 mr-2 focus:outline-none w-56 h-14 text-black border placeholder-gray-500" />
                        </li>
                    </ul>
                </div>

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
                        <li>
                            <input
                                type="text"
                                name={`configuration${index}`}
                                id="configuration"
                                placeholder='Telescope Configuration'
                                className="bg-white drop-shadow  duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md px-3 py-2 mr-2 focus:outline-none w-60 h-14 text-black border placeholder-gray-500" >
                            </input>
                        </li>
                    </ul>

                </div>
            </div>


            {/* Momentarily stopped formatting here cause it was taking too long lol */}


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
                                    Start Date:
                                </label>
                                <div className='border rounded-md '>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            name={`startDate${index}`}
                                            label="Start Date"
                                            className='bg-white drop-shadow  duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md border '

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
                                    Start Time:
                                </label>
                                <div className='border rounded-md'>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimeField
                                            required={true}
                                            format="HH:mm:ss"
                                            ampm={false}
                                            label="Start Time"
                                            name={`startTime${index}`}
                                            className='bg-white drop-shadow  duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md'
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
                                <div className='border rounded-md'>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            name={`endDate${index}`}
                                            label="End Date"
                                            className='bg-white drop-shadow  duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md'
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
                                <div className='border rounded-md'>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimeField
                                            ampm={false}
                                            format="HH:mm:ss"
                                            label="End Time"
                                            required={true}
                                            name={`endTime${index}`}
                                            className='bg-white drop-shadow  duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md '
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

                <div className="flex items-center">

                    {/* FREQUENCY */}
                    <div className=''>

                        <label
                            className="font-bold text-gray-800 mx-8"
                            htmlFor="frequency">
                            Frequency (GHz):
                        </label>
                        <input
                            type="text"
                            name={`frequency${index}`}
                            id="frequency"
                            placeholder='Frequency'
                            className=" bg-white drop-shadow  duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md px-3 py-2 mr-2 focus:outline-none w-56 h-14 text-black border placeholder-gray-500" />
                    </div>

                    {/* BANDWIDTH */}
                    <div className=''>
                        <label
                            className="font-bold text-gray-800 mx-8"
                            htmlFor="frequency">
                            Bandwidth (GHz):
                        </label>
                        <input
                            type="text"
                            name={`bandwidth${index}`}
                            id="bandwidth"
                            placeholder='Bandwidth'
                            className="  bg-white drop-shadow  duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md px-3 py-2 mr-2 focus:outline-none w-56 h-14 text-black border placeholder-gray-500" />
                    </div>
                    {/* DETECTION */}
                    <div className=''>
                        <label
                            className="font-bold text-gray-800 mx-8"
                            htmlFor="detection">
                            Detection:
                        </label>
                        <Checkbox
                            {...label}
                            defaultChecked={isChecked}
                            color="success"
                            name={`detection${index}`}
                            onChange={() => {
                                console.log("CHECKED")
                                handleCheck(index);
                                isChecked = !isChecked
                                console.log("Ischecked: ", isChecked)
                            }
                            }
                        >
                        </Checkbox>
                    </div>

                </div>
            </div>

            {/* LINE 5 */}
            <div className="w-full flex flex-row border-b-2 h-full py-5 text-black">
                <div className="flex items-center">

                    {/* FLUX DENSITY */}
                    <div className=''>
                        <label
                            className="font-bold text-gray-800 mx-8"
                            htmlFor="flux density">
                            Flux Density (mJy):
                        </label>
                        <input
                            type="text"
                            name={`fluxDensity${index}`}
                            id="flux"
                            placeholder='Flux Density'
                            className="  bg-white  drop-shadow  duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md px-3 py-2 mr-2 focus:outline-none w-56 h-14 text-black border placeholder-gray-500"
                        />
                    </div>

                    {/* FLUX DENSITY ERROR */}
                    <div className=''>
                        <label
                            className="font-bold text-gray-800 mx-8"
                            htmlFor="uncertainty">
                            Flux Density Error (mJy):
                        </label>
                        <input
                            type="text"
                            name={`uncertainty${index}`}
                            id="uncertainty"
                            placeholder='Flux Density Error'
                            className="  bg-white drop-shadow  duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md px-3 py-2 mr-2 focus:outline-none w-56 h-14 text-black border placeholder-gray-500" />

                    </div>
                </div>
            </div>

            {/* LINE 6 */}
            <div className="w-full flex flex-row border-b-2 h-full py-5 text-black">
                <div className="flex items-center">

                    {/* RMS */}
                    <div className=''>
                        <label
                            className="font-bold text-gray-800 mx-8"
                            htmlFor="rms">
                            RMS (mJy):
                        </label>
                        <input
                            type="text"
                            name={`rms${index}`}
                            id="rms"
                            placeholder='RMS'
                            className="  bg-white drop-shadow  duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md px-3 py-2 mr-2 focus:outline-none w-56 h-14 text-black border placeholder-gray-500" />
                    </div>

                </div>
            </div>


            {/* LINE 7 */}
            <div className='w-full h-full border-b-2 py-5'>
                <ul className='flex'>
                    <li className="flex flex-row">

                        {/* RA */}
                        <div className=''>

                            <label
                                className='font-bold text-gray-800 mx-8 self-center'
                                htmlFor='RA'>
                                RA (hh:mm:ss.ss):
                            </label>
                            <input
                                type='text'
                                name={`RA${index}`}
                                id='RA'
                                placeholder='RA'

                                className=" bg-white drop-shadow  duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md px-3 py-2 mr-2 focus:outline-none w-36 h-14 text-black border placeholder-gray-500">
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
                            <input
                                type='text'
                                name={`dec${index}`}
                                id='dec'
                                placeholder='Dec'

                                className=" bg-white  drop-shadow  duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md px-3 py-2 mr-2 focus:outline-none w-36 h-14 text-black border placeholder-gray-500">
                            </input>

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
                            <input
                                type='text'
                                name={`posEr${index}`}
                                id='posEr'
                                placeholder='Positional Error'

                                className=" bg-white  drop-shadow  duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md px-3 py-2 mr-2 focus:outline-none w-56 h-14 text-black border placeholder-gray-500">
                            </input>
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
                    <Textarea placeholder="Anything of note..." name={`notes${index}`} id="notes" className=" bg-white  drop-shadow  duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md px-3 py-2 mr-2 focus:outline-none w-96  text-black border placeholder-gray-500"
                        style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.01)' }}
                    //style={{ border: 'none' , boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }} 

                    />
                    {/* <input
                        type="text"
                        name={`notes${index}`}
                        id="notes"
                        placeholder='Anything of note...'
                        className="bg-slate-100 drop-shadow-xl rounded-md px-3 py-2 mr-2 focus:outline-none w-96 text-black" /> */}
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
                            name={`fits${index}`}
                            type="file"
                            className=" text-sm text-stone-500
                                        file:mr-5 file:py-1 file:px-3 file:border-[1px] file:rounded-md
                                        file:text-xs 
                                        file:bg-stone-50 file:text-stone-700
                                        hover:file:cursor-pointer hover:file:bg-blue-50
                                        hover:file:text-blue-700
                                        file:transition-all transition-all"

                            accept=".fit, .fits">
                        </input>
                    </div>
                </div>
            </div >


            {/* The bellow will only render the delete button when there are more than 1 forms in the array
            Actually it broken, I'll just make it so you can always delete */}
            {
                forms.current.length >= 0 && (
                    <div className="flex my-4 justify-center ">

                        <Button
                            onClick={() => {
                                console.log("Attempting to delete form with index: ", index, "!")
                                // function removeElementFromArray<T>(array: T[], element: T): T[] {
                                //     const index = array.indexOf(element);
                                //     console.log("index to delete is: ", index)
                                //     if (index !== -1) {
                                //         array.splice(index, 1);
                                //     }

                                //     return array;
                                // }


                                console.log('forms before forEach: ', forms.current);
                                forms.current.forEach((curForm: ObservationFormType, i: number) => {
                                    //we want to check if a value of an input in searchIndex is the same as what this index would be
                                    console.log("checking: ", curForm.index, " against: ", index)
                                    console.log('curForm: ', curForm);
                                    console.log('forms: ', forms.current);

                                    if (curForm.index === index) {
                                        // this wil run when it finds someting with the same entry as itself
                                        // updateObservations(forms => removeElementFromArray(forms, curForm));
                                        updateObservations(forms => forms.filter((form: ObservationFormType) => form.index !== curForm.index));
                                        console.log("filtered forms: ", forms.current);

                                    }
                                    else {
                                        console.log('no luck')
                                    }
                                })
                            }
                            }
                            type="button"
                            className="text-white drop-shadow-xl bg-red-600 w-1/5"
                        >
                            Remove Observation
                        </Button>
                    </div>
                )
            }

        </div >);

    let formContainer: ObservationFormType = {
        index: index,
        form: form,
        checked: isChecked
    }

    return formContainer;
}

export default ObservationForm;