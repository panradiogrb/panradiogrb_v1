/**
 * This file contains all form related Server Actions - functions to be called by forms for creating and mutating GRB Event/Observation data
 */

'use server'

import { fetchImageById, fetchObservationById, fetchSelectedEvent, fetchSelectedObservations } from "./data";
import { CalculateDuration, GetEarliestDate, GetLocalDateFromString, ParseDateString } from "@/lib/form-helpers";
import { DetectionObservationSchema, EventSchema, NonDetectionObservationSchema } from "./validation-schemas";
import { validationErrors } from "@/components/objects/event";
import { eventNameRegex } from "./regex";
import { prisma } from "./db";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import crypto from "crypto";
import { getSignedURL } from "./uploads3";
import { deleteFile } from "./deletes3";

/****************************************************************************************************************************************
 * ACTION: Create a new entry - This could be either a new event and it's observations, or just new observations for an existing event
 * Reference: https://nextjs.org/learn/dashboard-app/mutating-data#2-create-a-server-action
 ****************************************************************************************************************************************/
// Intermediate observation type to store observation data through prisma.create() function
type Observation = {
    parent: string;
    time: Date;
    endtime: Date;
    duration: number;
    frequency: number;
    bandwidth: number;
    configuration: string;
    detection: boolean;
    flux: number;
    fluxerror: number;
    rms: number;
    notes: string;
    observer: string;
    burstadvocate: string;
    userid: number;
    ra: string;
    dec: string;
    poser: number;
    data_processor: string;
    fits: FormDataEntryValue | null
};

export async function createEntry(rawEntryData: FormData) {
    /*****************************************************************************************************************************
     * 1. Organize raw entry form data into an array of observation subforms FormData objects for easier access to subform data
     *****************************************************************************************************************************/
    // 1.1 Convert FormData entries to an array for easier iteration through each form input field
    const existingEvent = await fetchSelectedEvent(rawEntryData.get('event')?.toString() ?? ""); // Store existing event record if it's already in the database
    const formDataArray = Array.from(rawEntryData.entries());

    // 1.2 Create a separate array to store observation subforms as objects
    const subforms: FormData[] = [];

    // 1.3 Iterate through FormData entries and fill up observationSubforms array with subform objects
    console.log(`EVENT NAME: ${rawEntryData.get('event')}\n`)

    for (const [entryformFieldName, value] of formDataArray) {
        // Extract subform field name and subform index from the entryformFieldName, and store values in a regex match array
        //      e.g. entryformFieldName = 'frequency1' -> subform field name = 'frequency' and observation subform index = 1
        const match = entryformFieldName.match(/^(.+?)(\d+)$/);

        if (match) {
            const subformFieldName = match[1];          // Storing subform input field name
            const subformIndex = parseInt(match[2]);    // Storing subform index

            // If the subform object doesn't exist already in subform array, create a new subform object and add it
            if (!subforms[subformIndex]) {
                const newFormData = new FormData();
                newFormData.append('detection', 'false'); // Include 'detection' field with starting value of false
                subforms[subformIndex] = newFormData;
            }

            // If subform field name is detection, change the value of the subform detection field if it has it already
            if (subformFieldName === 'detection' && subforms[subformIndex].get('detection')) {
                subforms[subformIndex].set(subformFieldName, value);
            } else {
                // Else, add the subform field and value to current subform index
                subforms[subformIndex].append(subformFieldName, value);
            }
        }
    }

    subforms.forEach((subform, index) => {
        // console.log(`Observation Subform: ${index}`, subform);
        // console.log(subform.startDate + " " + subform.startTime);
    });

    /*********************************************************************************************************************************************************************
     * 2. - Iterate through newly created 'subforms' array, validate each subform field using Zod, and store validated subforms to be added to database
     *    - Any input validation errors will also be stored in 'subformErrors' array to be returned to entry form, to display
     *********************************************************************************************************************************************************************/
    // Create an array to store successfully validated observation subforms. If all subforms inputs are valid, add events, observations and images to database
    let validObservations: Observation[] = [];
    let allSubformsValid: boolean = true;       // Starts as true. Will only be false if at least 1 subform has invalid inputs

    // If any form input fields are invalid, store their errors in an array to return back to entry form UI to display
    let subformErrors: validationErrors[] = [];

    // CHECK EVENT NAME FIELD
    if (!eventNameRegex.test(rawEntryData.get('event')?.toString() ?? "")) {
        // Set valid flag to 'false' so database call will not occur
        allSubformsValid = false;

        // Store event name validation error
        subformErrors.push({
            subformId: 0,
            field: 'Event Name',
            message: 'Event name needs to follow the format of 6 consecutive digits, and any sequence of capitals letters (e.g. 240401, 240401A, 240401AB, 240401ABC)'
        })
    }

    // CHECK ALL SUBFORM FIELDS
    subforms.forEach((subform, subformIndex) => {
        // 2.1 Create Date objects for current subform, based on the subform's separate start/end date and time fields
        const startDate = GetLocalDateFromString(`${subform.get('startDate')} ${subform.get('startTime')}`);
        const endDate = GetLocalDateFromString(`${subform.get('endDate')} ${subform.get('endTime')}`);

        // 2.2 If event exists already, make sure observation's startDate is equal to or later than event's current start date
        if (existingEvent != null) {
            if (startDate < existingEvent.date) {
                // Set valid flag to 'false' so database call will not occur
                allSubformsValid = false;

                // Add 'observation start date being earlier than existing event date' error to subformErrors array
                subformErrors.push({
                    subformId: subformIndex + 1,    // +1 because subform index starts at 0, but subforms should be shown to user starting from 1
                    field: 'Start Date',
                    message: `Observation 'Start Date' must be equal to or later than parent event '${existingEvent.name}' start date: ${existingEvent.date.toString()}.`
                })
            }
        }

        // 2.3 Check if endDate is later than or equal to startDate
        if (endDate < startDate) {
            // Set valid flag to 'false' so database call will not occur
            allSubformsValid = false;

            // Add 'end date being earlier than start date' error to subformErrors array
            subformErrors.push({
                subformId: subformIndex + 1,    // +1 because subform index starts at 0, but subforms should be shown to user starting from 1
                field: 'End Date',
                message: 'End Date must be equal to or later than Start Date'
            })
        }

        // 2.4 If startDate and endDate are valid, calculate duration
        const duration = CalculateDuration(startDate, endDate);

        // 2.5 Create an observation object to be validated by Zod observation schema
        const observation: Observation = {
            parent: rawEntryData.get('event')?.toString() ?? "",
            time: startDate,
            endtime: endDate,
            duration: duration,
            frequency: subform.get('frequency') ? parseFloat(subform.get('frequency')?.toString() ?? '') : -1,
            bandwidth: subform.get('bandwidth') ? parseFloat(subform.get('bandwidth')?.toString() ?? '') : -1,
            configuration: subform.get('configuration')?.toString() ?? "",
            detection: (subform.get('detection') === 'on') ? true : false,
            flux: subform.get('fluxDensity') ? parseFloat(subform.get('fluxDensity')?.toString() ?? '') : -1,
            fluxerror: subform.get('uncertainty') ? parseFloat(subform.get('uncertainty')?.toString() ?? '') : -1,
            rms: subform.get('rms') ? parseFloat(subform.get('rms')?.toString() ?? '') : -1,
            notes: subform.get('notes')?.toString() ?? "",
            observer: subform.get('observer')?.toString() ?? "",          // Enter from Supabase client?
            burstadvocate: subform.get('advocate')?.toString() ?? "",
            userid: 1,                                                    // Enter id from Supabase client
            ra: subform.get('RA')?.toString() ?? "",
            dec: subform.get('dec')?.toString() ?? "",
            poser: subform.get('posEr') ? parseFloat(subform.get('posEr')?.toString() ?? '') : -1,
            data_processor: subform.get('dataProcessor')?.toString() ?? "",
            fits: subform.get('fits')
        }

        // 2.6 Use appropriate validation schema based on observation detection, and retrieve result of the Zod observation check
        let validationResult = null;
        if (observation.detection === true) {
            // DETECTION SCHEMA
            validationResult = DetectionObservationSchema.omit({ parent: true }).safeParse(observation);
        } else {
            // NON DETECTION SCHEMA
            validationResult = NonDetectionObservationSchema.omit({ parent: true }).safeParse(observation);
        }

        // 2.7 If observation passes validation check, store validated observation. If failed, store validation error to be returned to frontend
        if (!validationResult.success) {
            // Set valid flag to 'false' so database call will not occur
            allSubformsValid = false;

            validationResult.error.issues.forEach(issue => {
                subformErrors.push({
                    subformId: subformIndex + 1,    // +1 because subform index starts at 0, but subforms should be shown to user starting from 1
                    field: issue.path.toString(),
                    message: issue.message
                })
            })
            // console.log(`Observation ${subformIndex} INVALID:\n ${validationResult.error.issues.forEach((issue) => { console.log(issue) })}`)
        } else {
            console.log(`Observation ${subformIndex} VALID`)
            validObservations.push(observation);
        }

        console.log('\n Number of valid observation forms: ' + validObservations.length);
    })

    // subformErrors.forEach(error => { console.log(error) });

    /*****************************************************************************************************************************************************************************
     * 3. At this point, either all form data is validated and ready to be sent to database. If not, return all validation error messages to entry form, so user can fix input values
     *****************************************************************************************************************************************************************************/
    if (allSubformsValid == false) {
        console.log("INVALID DATA - WONT SEND TO DB");
        return {
            success: false,
            databaseErrors: "",
            subformErrors: subformErrors,
        }
    } else if (validObservations.length > 0) {
        console.log("ALL DATA VALID - SEND DATA TO DB");
        // 3.1 Check if event already exists in database. Create new event if it doesn't exist
        let selectedEvent = await fetchSelectedEvent(rawEntryData.get('event')?.toString() ?? "");

        // 3.2 If event doesn't exist, create new event and add to database
        if (selectedEvent == null) {
            selectedEvent = {
                name: rawEntryData.get('event')?.toString() ?? "",
                date: GetEarliestDate(validObservations),
                creator: "Placeholder Creator from 'createEntry' Server Action"
            }

            try {
                const createdEvent = await prisma.events.create({
                    data: selectedEvent
                })
                console.log(`Created New Event: ${createdEvent.name}`);
            } catch (e) {
                return {
                    success: false,
                    databaseErrors: `Could not add event ${selectedEvent.name} to database.`,
                    subformErrors: subformErrors,
                }
            }
        }

        // 3.3 After adding event to database, start adding each observation record to the database for the specified event
        validObservations.forEach(async (o, observationIndex) => {
            try {
                const createdObservation = await prisma.observations.create({
                    data: {
                        parent: selectedEvent.name,
                        time: o.time,
                        endtime: o.endtime,
                        duration: o.duration,
                        frequency: o.frequency,
                        bandwidth: o.bandwidth,
                        configuration: o.configuration,
                        detection: o.detection,
                        flux: o.flux,
                        fluxerror: o.fluxerror,
                        rms: o.rms,
                        notes: o.notes,
                        observer: o.observer,
                        burstadvocate: o.burstadvocate,
                        username: 'supabase username here', //o.userid,
                        ra: o.ra,
                        dec: o.dec,
                        poser: o.poser,
                        data_processor: o.data_processor,
                    }
                })

                console.log(`Created new observation '${createdObservation.observation_id}' for ${createdObservation.parent}`);

                // 3.4 After receiving observation success response (createdObservation), upload FITS file to S3, and store observation id and FITS signed URL into a prisma 'images' record

                // use createdObservation.observation_id and o.fits
                if (o.fits instanceof File && o.fits.name !== 'undefined') {
                    const fitsFile: File = o.fits;
                    //split .fits
                    const fileNameParts = fitsFile.name.split('.');
                    const fileNameWithoutExtension = fileNameParts[0];
                    //generating random key 
                    const keyname = (bytes = 32) => crypto.randomBytes(bytes).toString("hex")
                    const key2 = keyname()
                    //create key filename without.fits_key then .fits at end
                    const key = `${fileNameWithoutExtension}_${key2}.fits`;
                    console.log(key)
                    console.log(fileNameWithoutExtension)
                    try {
                        const s3Response = await getSignedURL(fitsFile, key)
                        console.log('File uploaded succesfully to S3 with: ', key)
                        try {
                            const createdImage = await prisma.images.create({
                                data: {
                                    observation_id: createdObservation.observation_id,
                                    key: key,
                                    file_name: fitsFile.name //need to test more
                                }
                            });
                            console.log(`Image record created with ID: ${createdImage.image_id}`);
                        } catch (dbError) {
                            console.error("Error inserting image record into database:", dbError);
                            return {
                                success: false,
                                databaseErrors: 'Could not insert image record into database for observation',
                                subformErrors: subformErrors,
                            };
                        }
                    } catch (error) {
                        console.error("Error uploading file to S3")
                        return {
                            success: false,
                            databaseErrors: 'Could not upload fits file observation for observation',
                            subformErrors: subformErrors,
                        }
                    }
                }
            } catch (error) {
                return {
                    success: false,
                    databaseErrors: `Could not add observation ${observationIndex} for event '${selectedEvent.name}' to database.`,
                    subformErrors: subformErrors,
                }
            }
        })

        // 3.5 After uploading new event and/or observation records to database, revalidate corresponding event pages cache to load new event data, and redirect user
        revalidatePath(`/dashboard/graph/${selectedEvent.name}`);
        redirect(`/dashboard/graph/${selectedEvent.name}`);
    } else {

        subformErrors.push({
            subformId: 0,    // Hard coded subform id to 0, because subform error doesn't relate to a specific observaiton form, but the entry form as a whole
            field: 'Invalid number of observation forms',
            message: 'Valid entries for an event must contain at least 1 filled out observation form.'
        })

        return {
            success: false,
            databaseErrors: ``,
            subformErrors: subformErrors,
        }
    }
}

/****************************************************************************************************************************************
 * ACTION: Update Observation - Updates a selected observation record
 * Reference: https://nextjs.org/learn/dashboard-app/mutating-data#updating-an-invoice
 ****************************************************************************************************************************************/
export async function updateObservation(id: number, rawObservationData: FormData) {

    /*********************************************************************************************************************************************************************
     * 1. - Validate all observation update form fields using Zod, and store new validated update object, to be added to database
     *    - Any input validation errors will also be stored in 'inputErrors' array to be returned to observation update form, to display
    *********************************************************************************************************************************************************************/

    // 1.1 Retrieve old observation record, to retrieve the existing parent record
    // console.log(`\nUPDATING OBSERVATION ${id}`, rawObservationData);
    const oldObservation = await fetchObservationById(id);
    const existingEvent = await fetchSelectedEvent(oldObservation?.parent ?? ''); // Store existing event record if it's already in the database

    // 1.2 Initialize input validation error variables
    let subformErrors: validationErrors[] = []; // If any form input fields are invalid, store their errors in an array to return back to entry form UI to display
    let allSubformsValid: boolean = true;       // Starts as true. Will only be false if at least 1 subform has invalid inputs

    // 1.3 Create Date objects for observation to be updated, based on the update form's separate start/end date and time fields
    const startDate = GetLocalDateFromString(`${rawObservationData.get('startDate')} ${rawObservationData.get('startTime')}`);
    const endDate = GetLocalDateFromString(`${rawObservationData.get('endDate')} ${rawObservationData.get('endTime')}`);

    // 1.4 If event exists already, make sure observation's startDate is equal to or later than event's current start date
    if (existingEvent != null) {
        if (startDate < existingEvent.date) {
            // Set valid flag to 'false' so database call will not occur
            allSubformsValid = false;

            // Add 'observation start date being earlier than existing event date' error to subformErrors array
            subformErrors.push({
                subformId: 1,    // Set to '1', because update form is only dealing with 1 observation form
                field: 'Start Date',
                message: `Observation 'Start Date' must be equal to or later than parent event '${existingEvent.name}' start date: ${existingEvent.date.toString()}.`
            })
        }
    }

    // 1.5 Check if endDate is later than or equal to startDate
    if (endDate < startDate) {
        // Set valid flag to 'false' so database call will not occur
        allSubformsValid = false;

        // Add 'end date being earlier than start date' error to subformErrors array
        subformErrors.push({
            subformId: 1,    // Set to '1', because update form is only dealing with 1 observation form
            field: 'End Date',
            message: 'End Date must be equal to or later than Start Date'
        })
    }

    // 1.6 If startDate and endDate are valid, calculate duration
    const duration = CalculateDuration(startDate, endDate);

    // 1.7 Create an observation object to be validated by Zod observation schema
    const observation: Observation = {
        parent: existingEvent?.name ?? "",
        time: startDate,
        endtime: endDate,
        duration: duration,
        frequency: rawObservationData.get('frequency') ? parseFloat(rawObservationData.get('frequency')?.toString() ?? '') : -1,
        bandwidth: rawObservationData.get('bandwidth') ? parseFloat(rawObservationData.get('bandwidth')?.toString() ?? '') : -1,
        configuration: rawObservationData.get('configuration')?.toString() ?? "",
        detection: (rawObservationData.get('detection') === 'on') ? true : false,
        flux: rawObservationData.get('flux') ? parseFloat(rawObservationData.get('flux')?.toString() ?? '') : -1,
        fluxerror: rawObservationData.get('fluxError') ? parseFloat(rawObservationData.get('fluxError')?.toString() ?? '') : -1,
        rms: rawObservationData.get('RMS') ? parseFloat(rawObservationData.get('RMS')?.toString() ?? '') : -1,
        notes: rawObservationData.get('notes')?.toString() ?? "",
        observer: rawObservationData.get('observer')?.toString() ?? "",          // Enter from Supabase client?
        burstadvocate: rawObservationData.get('burstAdvocate')?.toString() ?? "",
        userid: 1,                                                    // Enter id from Supabase client
        ra: rawObservationData.get('RA')?.toString() ?? "",
        dec: rawObservationData.get('dec')?.toString() ?? "",
        poser: rawObservationData.get('posEr') ? parseFloat(rawObservationData.get('posEr')?.toString() ?? '') : -1,
        data_processor: rawObservationData.get('dataProcessor')?.toString() ?? "",
        fits: rawObservationData.get('fits')
    }

    // console.log(observation);

    // 1.8 Use appropriate validation schema based on observation detection, and retrieve result of the Zod observation check
    let validationResult = null;
    if (observation.detection === true) {
        // DETECTION SCHEMA
        validationResult = DetectionObservationSchema.omit({ parent: true }).safeParse(observation);
    } else {
        // NON DETECTION SCHEMA
        validationResult = NonDetectionObservationSchema.omit({ parent: true }).safeParse(observation);
    }

    // 1.9 If observation passes validation check, store validated observation. If failed, store validation error to be returned to frontend
    if (!validationResult.success) {
        // Set valid flag to 'false' so database call will not occur
        allSubformsValid = false;

        validationResult.error.issues.forEach(issue => {
            subformErrors.push({
                subformId: 1,    // Set to '1', because update form is only dealing with 1 observation form
                field: issue.path.toString(),
                message: issue.message
            })
        })

        // console.log(`Observation ${oldObservation?.observation_id} INVALID:\n ${validationResult.error.issues.forEach((issue) => { console.log(issue.message) })}`)

    }

    /************************************************************************************************************************************************************************************************************************
     * 3. At this point, either all form data for updating observation is validated and ready to be sent to database. If not, return all validation error messages to update observation form, so user can fix input values
     ************************************************************************************************************************************************************************************************************************/
    if (allSubformsValid == false) {
        console.log('UPDATE FORM INVALID');
        return {
            success: false,
            databaseErrors: "",
            subformErrors: subformErrors,
        }
    } else {
        try {
            // 3.1 First update the observation record in 'observations' table in database
            const updated = await prisma.observations.update({
                where: {
                    observation_id: oldObservation?.observation_id
                },
                data: {
                    parent: oldObservation?.parent,
                    time: observation.time,
                    endtime: observation.endtime,
                    duration: observation.duration,
                    frequency: observation.frequency,
                    bandwidth: observation.bandwidth,
                    configuration: observation.configuration,
                    detection: observation.detection,
                    flux: observation.flux,
                    fluxerror: observation.fluxerror,
                    rms: observation.rms,
                    notes: observation.notes,
                    observer: observation.observer,
                    burstadvocate: observation.burstadvocate,
                    username: 'UPDATED supabase username here', //o.userid,
                    ra: observation.ra,
                    dec: observation.dec,
                    poser: observation.poser,
                    data_processor: observation.data_processor,
                }
            })

            // After updating observation, check if FITS file needs to be updated

            // 3.2 Retrieve current image record for the updated observation id, if it has one
            const oldImage = await fetchImageById(updated.observation_id);
            console.log('Old Image for updated observation:', oldImage);

            // 3.3 If user has provided a FITS file in update form, store the File object
            const updateFitsFile = rawObservationData.get('fits');
            if (updateFitsFile instanceof File) {
                const updateFitsFileObject: File = updateFitsFile;
                console.log('Provided Fits file in update form: ' + updateFitsFileObject.name);
                console.log('Current assigned Fits file to observation that was updated: ' + oldImage?.file_name);
                // If provided File object name is null, dont update anything
                if (updateFitsFileObject.name !== 'undefined') {
                    //console.log("Real file here")
                    if (oldImage === null) {
                        console.log("Old file null just upload new file")
                        const fileNameParts = updateFitsFileObject.name.split('.');
                        const fileNameWithoutExtension = fileNameParts[0];
                        const keyname = (bytes = 32) => crypto.randomBytes(bytes).toString("hex")
                        const key2 = keyname()
                        //const key = key2.concat('.fits')
                        const key = `${fileNameWithoutExtension}_${key2}.fits`;
                        console.log(fileNameWithoutExtension)
                        console.log(key)
                        console.log("Uploading file and creating new image entry", updateFitsFileObject.name)
                        try {
                            const s3Response = await getSignedURL(updateFitsFile, key)
                            console.log('File uploaded succesfully to S3 with: ', key)
                            try {
                                const createdImage = await prisma.images.create({
                                    data: {
                                        observation_id: updated.observation_id,
                                        key: key,
                                        file_name: updateFitsFileObject.name //need to test more
                                    }
                                });
                                console.log(`Image record created with ID: ${createdImage.image_id}`);
                            } catch (dbError) {
                                console.error("Error inserting image record into database:", dbError);
                                return {
                                    success: false,
                                    databaseErrors: 'Could not insert image record into database for observation',
                                    subformErrors: subformErrors,
                                };
                            }
                        } catch (error) {
                            console.error("Error uploading file to S3")
                            return {
                                success: false,
                                databaseErrors: 'Could not upload fits file observation for observation',
                                subformErrors: subformErrors,
                            }
                        }

                        //If file names are DIFFERNT then make changes and update, if the same do nothing again
                    } else if (updateFitsFileObject.name !== oldImage?.file_name) {
                        console.log("Files have differnt names make changes")
                        const fileNameParts = updateFitsFileObject.name.split('.');
                        const fileNameWithoutExtension = fileNameParts[0];
                        const keyname = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
                        const Key2 = keyname();
                        //const newKey = Key2.concat('.fits')
                        const newKey = `${fileNameWithoutExtension}_${Key2}.fits`;
                        console.log(fileNameWithoutExtension)
                        console.log(newKey)

                        try {
                            //Delete file first from S3
                            await deleteFile(oldImage.key);
                            console.log("old file deleted from S3", oldImage.key)
                            //Now upload the new File with new Key
                            const s3response = await getSignedURL(updateFitsFile, newKey)
                            console.log('File uploaded succesfully to S3 with: ', newKey)

                            //Now UPDATE the images table with new file name and new key
                            const updatedImage = await prisma.images.update({
                                where: {
                                    image_id: oldImage.image_id
                                },
                                data: {
                                    key: newKey,
                                    file_name: updateFitsFileObject.name,
                                },
                            });
                            console.log('Images table updated with new file name and key:', updatedImage);

                        } catch (error) {
                            console.error("Error uploading file to S3 or updating file")
                        }

                    }

                }

                // If provided File object name is not null, and is not the same as oldImage.file_name, then delete oldImage from S3, Upload updateFitsFileObject, and update old image record key with new key using 'oldImage?.observation_id' in prisma call
            }

            // return {
            //     success: false,
            //     databaseErrors: ``,
            //     subformErrors: subformErrors,
            // }

            // console.log(`UPDATED OBSERVATION [${oldObservation?.observation_id}:${updated.observation_id}]`);
        } catch (error) {
            return {
                success: false,
                databaseErrors: `Could not UPDATE observation ${oldObservation?.observation_id} for event '${existingEvent?.name}' to database.`,
                subformErrors: subformErrors,
            }
        }

        // // 3.1 After uploading new event and/or observation records to database, revalidate corresponding event pages cache to load new event data, and redirect user
        revalidatePath(`/dashboard/graph/${existingEvent?.name}`);
        redirect(`/dashboard/graph/${existingEvent?.name}`);
    }
}

/****************************************************************************************************************************************
 * ACTION: Delete Event
 * Reference: https://nextjs.org/learn/dashboard-app/mutating-data#deleting-an-invoice
 ****************************************************************************************************************************************/
export async function deleteEvent(eventToDelete: string, rawDeleteEventData: FormData) {
    console.log(`Deleting Event: ${eventToDelete}`)

    // 1. Fetch all of this event's observations first
    const observations = await fetchSelectedObservations(eventToDelete);

    // 2. Iterate through each observation, retrieve it's corresponding image record if it has one, and delete it's FITS file from s3
    observations.forEach(async (o, index) => {
        const image = await fetchImageById(o.observation_id);
        //console.log(`Observation Image: ${index} - ${image}`);
        //delete if image exists
        if (image) {
            console.log(`image to delete, ${image} ${image.key}`);
            try {
                await deleteFile(image.key);
                console.log(`Deleted file from S3: ${image.key}`);
            } catch (error) {
                console.error(`Failed to delete file from S3: ${image.key}`, error);
                throw new Error(`Failed to delete file from S3: ${image.key}`);
            }
        }

        // 2.1 ---------- (Delete each image from S3 if image record exists) ----------
    })

    // 3. After confirming delete for each image from S3, delete event and all child observations/image records will delete on cascade
    try {
        const deletedEvent = await prisma.events.delete({
            where: {
                name: eventToDelete
            }
        })

        console.log(`Deleted Event '${deletedEvent.name}' - All it's observations and image records will be deleted too`)
    } catch (error) {
        throw Error(`Couldn't delete event: ${eventToDelete}`);
    }

    // 4. After deleting event, redirect to database page
    revalidatePath(`/dashboard/database`);
    redirect(`/dashboard/database`);
}

/****************************************************************************************************************************************
 * ACTION: Delete Observation
 * Reference: https://nextjs.org/learn/dashboard-app/mutating-data#deleting-an-invoice
 ****************************************************************************************************************************************/
export async function deleteObservation(id: number, rawDeleteObservationData: FormData) {
    console.log(`Deleting Observation: ${id}`);

    // 1. Fetch all of this event's observations first
    const observation = await fetchObservationById(id);

    // 2. Retrieve observation's corresponding image record if it has one, and delete it's FITS file from s3
    const image = await fetchImageById(observation?.observation_id ?? -1);
    if (image) {
        //console.log(`Deleting file from S3: ${image.key}`);
        try {
            await deleteFile(image.key);
            console.log(`Deleted file from S3: ${image.key}`);
        } catch (error) {
            console.error(`Failed to delete file from S3: ${image.key}`, error);
            throw new Error(`Failed to delete file from S3: ${image.key}`);
        }
    }

    // ---------- (Delete FITS file from S3 here before deleting observation) -----------------

    // 3. After confirming delete for image from S3, delete observation and any associated image record will also delete on cascade
    try {
        const deletedObservation = await prisma.observations.delete({
            where: {
                observation_id: id
            }
        })

        console.log(`Deleted Observation '${deletedObservation.observation_id}' - Any associated image record for this observation will be deleted too`)
    } catch (error) {
        throw Error(`Couldn't delete observation: ${observation?.observation_id}`);
    }

    // 4. After deleting observation, redirect to parent events page
    revalidatePath(`/dashboard/graph/${observation?.parent}`);
    redirect(`/dashboard/graph/${observation?.parent}`);
}