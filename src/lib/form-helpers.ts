import { Observation } from "@/components/objects/event";
import { ObservationFormType } from "../app/(authorised)/dashboard/entry/entry-form";
import { Prisma } from '@prisma/client'

export function GetEarliestDate(observations: any[]) {
    let earliestTime = observations[0].time;

    observations.forEach(o => {
        const currentTime = o.time;
        // Compare the current time with the earliestTime
        if (currentTime < earliestTime) {
            earliestTime = currentTime;
        }
    })

    return earliestTime;
}

export function GetFirstDate(observations: Observation[]): Date {
    let date: Date = new Date;
    let tester: Date = date;

    observations.forEach((obs: Observation, i: number) => {
        //If it's the first loop, assign the date so we have something to compare from.
        if (i == 0) {
            date = obs.time;
        }
        //Check if the date being currently checked is earlier than the current assigned one.
        else if (obs.time.getTime() < date.getTime()) {
            date = obs.time;
        }
    })

    //If we get here and the 'date' equals 'tester', there has been an error as 'date' was never updated.
    if (date.getTime() === tester.getTime()) {
        throw new Error('Date did not update. There is an error in the observation object passed, no date to update with.')
    }

    return date;
}

//Creates the array of observations for the GammaEvent object. This is exported so it can be tested.
export function GenerateObservations(eventName: string, formData: FormData, observationFormObjects: ObservationFormType[]): Observation[] {
    let observationArray: Observation[] = [];

    //Loop through all the observationFormObjects to access their index
    observationFormObjects.forEach((obs) => {

        //Get the detection
        const detection = formData.get(`detection${obs.index}`);
        let checked: boolean;

        if (detection === "on") {
            checked = true;
        } else {
            checked = false;
        }

        //Get the times as a String. These WILL exist as their input fields are required
        const startTime: string = formData.get(`startTime${obs.index}`)?.toString() as string;
        const endTime: string = formData.get(`endTime${obs.index}`)?.toString() as string;

        console.log(startTime, ' ', endTime)

        //Get date strings. These also will exist as they are required.
        const startDate: String = formData.get(`startDate${obs.index}`)?.toString() as string;
        const endDate: String = formData.get(`endDate${obs.index}`)?.toString() as string;

        console.log(startDate, ' ', endDate);

        //Combine the two strings to get the date constructor
        const startDateStr: string = startDate + ' ' + startTime;
        const endDateStr: string = endDate + ' ' + endTime;

        //Parse the time & date strings into 2 date objects
        const finalStartDate: Date = ParseDateString(startDateStr);
        const finalEndDate: Date = ParseDateString(endDateStr);



        const observation: Observation = {
            parent: eventName,
            id: obs.index + 1,
            time: finalStartDate,
            endTime: finalEndDate,
            duration: CalculateDuration(finalStartDate, finalEndDate),
            frequency: parseFloat(formData.get(`frequency${obs.index}`) as string),
            bandwidth: parseFloat(formData.get(`bandwidth${obs.index}`) as string),
            configuration: formData.get(`configuration${obs.index}`) as string,
            detection: checked,
            flux: parseFloat(formData.get(`fluxDensity${obs.index}`) as string),
            fluxError: parseFloat(formData.get(`uncertainty${obs.index}`) as string),
            RMS: parseFloat(formData.get(`rms${obs.index}`) as string),
            notes: formData.get(`notes${obs.index}`) as string,
            observer: formData.get(`observer${obs.index}`) as string,
            burstAdvocate: formData.get(`advocate${obs.index}`) as string,
            userId: 1,
            RA: formData.get(`RA${obs.index}`) as string,
            dec: formData.get(`dec${obs.index}`) as string,
            posEr: parseFloat(formData.get(`posEr${obs.index}`) as string),
            fits: formData.get(`fits${obs.index}`) as (File | null)
        };

        // Push the observation to the observations array 
        observationArray.push(observation);

    })

    //Return the created array
    return observationArray;
}

/*
        calculateDuration
        -----
        Calculates the number of seconds between the two dates.
        This is exported for jest testing purposes.
      */
export function CalculateDuration(startTime: Date, endTime: Date): number {
    //This returns the difference between the 2 times in milliseconds.
    let time: number = Math.abs(endTime.getTime() - startTime.getTime());   //using Math.abs so it doesn't matter the order the 2 dates are passed to the function

    return time / 1000; //Divide by 1000 to convert milliseconds to regular seconds
}

/****************************************************************************************
 * METHOD: CalculateDurationDecimal
 * - Same as function 'CalculateDuration' but returns the Decimal version of the result
 ****************************************************************************************/
export function CalculateDurationDecimal(startTime: Date, endTime: Date): Prisma.Decimal {
    // This returns the difference between the 2 times in milliseconds.
    // Using Math.abs so it doesn't matter the order the 2 dates are passed to the function
    // Divide by 1000 to convert milliseconds to regular seconds
    let time: Prisma.Decimal = new Prisma.Decimal(Math.abs(endTime.getTime() - startTime.getTime()) / 1000);

    return time;
}

/**************************************************************************************************************************************************
 * METHOD: GetLocalDateFromString
 * - Retrieves a string in the format [DD/MM/YY HH:MM:SS] and returns a local Date object based on the string
 * - Purpose is to retrieve the Date object equivalent of form data values as a 'local' Date object, because Prisma will do the UTC date conversion
 **************************************************************************************************************************************************/
export function GetLocalDateFromString(dateString: string): Date {
    const [date, time] = dateString.split(' ');
    const [hours, minutes, seconds] = time.split(':');
    const [day, month, year] = date.split('/');

    // -1 on the months cause months in JavaScript's Date object are zero-based (0 for January, 11 for December)
    const localDate = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes), Number(seconds));

    return localDate;
}

/*
        parseDateString
        ---------
         When given a string of the form 'dd/mm/yyyy hh:mm:ss', returns a Date object with UTC time of the input string.
         This is exported for jest testing purposes.
      */
export function ParseDateString(dateString: string): Date {
    const [date, time] = dateString.split(' ');
    const [hours, minutes, seconds] = time.split(':');
    const [day, month, year] = date.split('/');

    // -1 on the months cause months in JavaScript's Date object are zero-based (0 for January, 11 for December)
    const utcDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes), Number(seconds)));

    return utcDate;
}

export function GetCreatorName(): string {
    /*
      This function is placeholder.
      The intention is that when it is called, the currently logged in user is checked
      for their name, and it is assigned to this field.
      Should be handled by the backend
    */
    return 'placeholder-creator';
}