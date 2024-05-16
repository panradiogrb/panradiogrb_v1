/*
    Name: Thomas Marshall Childs
    Date: 02/04/2024

    event.tsx
    -----
    This file contains the structure for the GammaEvent & Observation objects. These are used throughout the admin pages of the frontend
    for the displaying, storing & editing of data relating to stored gamma events.
    
formation read from the database should be s#aed in one of these objects. Ideally, an array of GammaEvent objects should be able
    1`to provide information on all events in the database.
    Graph visualisation works through using a GammaEvent object to pull information from.


    GammaEvent
    -----
    A GammaEvent is an object that contains information on a specific gamma-ray-blast event.
    It includes the following variables;
        - name: string  -   The name of the event itself. Generally of the form YYMMDDX, with X being A, B, C ... etc based on 
                            if it was the first, second, third, etc event recorded that day
        - date: Date    -   This variable holds a javascript Date object. This date object has the date & time of the event's 
                            initial discovery. They can be accessed seperately
        - creator: string    -   The person who initially created the event in the database.
        - observations: Observation[]   -   This variable contains an array of Observation objects. These are all the recorded
                                            observations of the gamma-ray-object. 
*/

export type GammaEvent = {
    name: string,
    date: Date,
    creator: string,
    observations: Observation[]
}


/*
Observation
-----
An Observation object contains all the information of a given observation of a gamma event, including the time, date, recorded
    values & parent event of the observation.
    It holds the following variables;
        - parent: GammaEvent    -   The parent GammaEvent object this Observation should be tied to. Only used for error checking to ensure
                                    observations are stored with correct gamma-ray-blase event.
                                    - id: number    -   Individual ID of this observation instance. Different for every observation, even across different GammaEvents(? check this tom lol) 
        - time: Date    -   This variable contains a Date object, much like the GammaEvent date field. This can be used to access the date
                            & time of a given event. It may be the same or later than the parent GammaEvent's date, but cannot be before.
        - duration: number  -   The amount of time that elapsed for this observation (I think, check with gemma)
        - freqeuncy: number -   The frequency of the wavelength of light that was observered. Stored in GHz.
        - bandwidth: number -   UNSURE WHAT THIS IS IN RELATION TO OBSERVATIONS, PLEASE FIND OUT FROM DATABASE TEAM. Stores the bandwidth of the observation, though.
        - configuration: string -   The configuration that the telescope was in when the observation was gathered.
        - detection: boolean    -   This variable contains information on wether the event was recorded as an actual detection, or if it
                                    did not have adequate data to do so conclusively and so it is an assumption / estimation.
        - flux: number  -   The value of the strength of the light. Stored in mJy.
        - fluxError: number -   The uncertainty range of the flux reading. Stored in +-mJy.
        - RMS: number   -   Man idk? What is this?
        - notes: string -   Notes from the observation. Eg 'very cloudy day' or 'clear skys, good reading'.
        - observer: string  -   The original observer at the burst advocate.
        - burstAdvocate: string -   The organisation who gathered this observation originally.
        - userId: number    -   The ID of the user who input this observation into the table.
        - RA: string    -   The RA position of the observation. In the form 'hh:mm:ss.ss'.
        - dec: string   -   The dec position of the observation. In the form 'hh:mm:ss.ss'.
        - posEr: number -   The amount of error or uncertainty in the position readings.
*/

export type Observation = {
    parent: string,
    id: number,
    time: Date,
    endTime: Date,
    duration: number,
    frequency: number,
    bandwidth: number,
    configuration: string,
    detection: boolean,
    flux: number,
    fluxError: number
    RMS: number,
    notes: string,
    observer: string,
    burstAdvocate: string,
    userId: number,
    RA: string,
    dec: string,
    posEr: number,
    fits: (File | null),
    dataProcessor?: string,
}

/***********************************************************************************************************
 * - validationErrors: A specific errors object that will store a validation error for a specific field in
 *                     a specific form
 ***********************************************************************************************************/
export type validationErrors = {
    subformId: number,
    field: string,
    message: string
};

/***********************************************************************************************************
 * - EntryFormErrors: A type for objects which will contain a list of observation subform errors
 * - These will be displayed above the entry form as red text if any sub form doesn't pass validation check
 ***********************************************************************************************************/
export type EntryFormErrors = {
    success: boolean,
    databaseErrors: string,
    subformErrors: validationErrors[]
};

export function GammaEventToString(ge: GammaEvent): string {


    return (ge.name + ge.creator + ge.date.toString() + ge.observations.toString());
}

//Current placeholder, gets a tester gammaEvent for use around the frontend
export async function GetGammaEvent(): Promise<GammaEvent> {
    return (
        {
            name: "testevent",
            creator: "testcreator",
            date: new Date("2024-03-10"),
            observations: [
                {
                    parent: 'testevent',
                    time: new Date("2024-03-11 03:24:00"),
                    endTime: new Date("2024-03-11 03:56:00"),
                    detection: true,
                    duration: 5,
                    RMS: 1,
                    frequency: 5,
                    flux: 10,
                    fluxError: 0.05,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-12 16:24:00"),
                    endTime: new Date("2024-03-12 16:56:00"),
                    detection: false,
                    duration: 5,
                    RMS: 1,
                    frequency: 5,
                    flux: 27,
                    fluxError: 0.05,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-13 03:24:00"),
                    endTime: new Date("2024-03-13 03:56:00"),
                    detection: true,
                    duration: 5,
                    RMS: 1,
                    frequency: 5,
                    flux: 43,
                    fluxError: 0.05,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-14 08:24:00"),
                    endTime: new Date("2024-03-14 08:56:00"),
                    detection: true,
                    duration: 5,
                    RMS: 1,
                    frequency: 5,
                    flux: 12,
                    fluxError: 0.05,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-11"),
                    endTime: new Date("2024-03-11"),
                    detection: true,
                    duration: 10,
                    RMS: 2,
                    frequency: 10,
                    flux: 15,
                    fluxError: 0.6,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-12"),
                    endTime: new Date("2024-03-12"),
                    detection: false,
                    duration: 10,
                    RMS: 1,
                    frequency: 10,
                    flux: 21,
                    fluxError: 0.6,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-16"),
                    endTime: new Date("2024-03-16"),
                    detection: false,
                    duration: 13,
                    RMS: 1,
                    frequency: 10,
                    flux: 30,
                    fluxError: 5,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-13 06:34:00"),
                    endTime: new Date("2024-03-13 06:56:00"),
                    detection: true,
                    duration: 10,
                    RMS: 1,
                    frequency: 11,
                    flux: 15,
                    fluxError: 0.6,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-14"),
                    endTime: new Date("2024-03-14"),
                    detection: false,
                    duration: 10,
                    RMS: 1,
                    frequency: 3,
                    flux: 15,
                    fluxError: 0.6,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-15 14:20:00"),
                    endTime: new Date("2024-03-15 14:56:00"),
                    detection: true,
                    duration: 10,
                    RMS: 1,
                    frequency: 3,
                    flux: 49,
                    fluxError: 0.6,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-13"),
                    endTime: new Date("2024-03-13"),
                    detection: true,
                    duration: 10,
                    RMS: 1,
                    frequency: 10,
                    flux: 15,
                    fluxError: 0.6,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-15"),
                    endTime: new Date("2024-03-15"),
                    detection: false,
                    duration: 10,
                    RMS: 1,
                    frequency: 6,
                    flux: 15,
                    fluxError: 0.6,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-17"),
                    endTime: new Date("2024-03-17"),
                    detection: true,
                    duration: 10,
                    RMS: 1,
                    frequency: 6,
                    flux: 49,
                    fluxError: 0.6,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
            ]
        }
    );
}

//Current placeholder, gets a tester gammaEvent for use around the frontend
export function GetTestGammaEvent(): GammaEvent {
    return (
        {
            name: "testevent",
            creator: "testcreator",
            date: new Date("2024-03-10"),
            observations: [
                {
                    parent: 'testevent',
                    time: new Date("2024-03-11 03:24:00"),
                    endTime: new Date("2024-03-11 03:56:00"),
                    detection: true,
                    duration: 5,
                    RMS: 1,
                    frequency: 5,
                    flux: 10,
                    fluxError: 0.05,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-12 16:24:00"),
                    endTime: new Date("2024-03-12 16:56:00"),
                    detection: false,
                    duration: 5,
                    RMS: 1,
                    frequency: 5,
                    flux: 27,
                    fluxError: 0.05,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-13 03:24:00"),
                    endTime: new Date("2024-03-13 03:56:00"),
                    detection: true,
                    duration: 5,
                    RMS: 1,
                    frequency: 5,
                    flux: 43,
                    fluxError: 0.05,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-14 08:24:00"),
                    endTime: new Date("2024-03-14 08:56:00"),
                    detection: true,
                    duration: 5,
                    RMS: 1,
                    frequency: 5,
                    flux: 12,
                    fluxError: 0.05,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-11"),
                    endTime: new Date("2024-03-11"),
                    detection: true,
                    duration: 10,
                    RMS: 2,
                    frequency: 10,
                    flux: 15,
                    fluxError: 0.6,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-12"),
                    endTime: new Date("2024-03-12"),
                    detection: false,
                    duration: 10,
                    RMS: 1,
                    frequency: 10,
                    flux: 21,
                    fluxError: 0.6,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-16"),
                    endTime: new Date("2024-03-16"),
                    detection: false,
                    duration: 13,
                    RMS: 1,
                    frequency: 10,
                    flux: 30,
                    fluxError: 5,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-13 06:34:00"),
                    endTime: new Date("2024-03-13 06:56:00"),
                    detection: true,
                    duration: 10,
                    RMS: 1,
                    frequency: 11,
                    flux: 15,
                    fluxError: 0.6,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-14"),
                    endTime: new Date("2024-03-14"),
                    detection: false,
                    duration: 10,
                    RMS: 1,
                    frequency: 3,
                    flux: 15,
                    fluxError: 0.6,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-15 14:20:00"),
                    endTime: new Date("2024-03-15 14:56:00"),
                    detection: true,
                    duration: 10,
                    RMS: 1,
                    frequency: 3,
                    flux: 49,
                    fluxError: 0.6,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-13"),
                    endTime: new Date("2024-03-13"),
                    detection: true,
                    duration: 10,
                    RMS: 1,
                    frequency: 10,
                    flux: 15,
                    fluxError: 0.6,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-15"),
                    endTime: new Date("2024-03-15"),
                    detection: false,
                    duration: 10,
                    RMS: 1,
                    frequency: 6,
                    flux: 15,
                    fluxError: 0.6,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
                {
                    parent: 'testevent',
                    time: new Date("2024-03-17"),
                    endTime: new Date("2024-03-17"),
                    detection: true,
                    duration: 10,
                    RMS: 1,
                    frequency: 6,
                    flux: 49,
                    fluxError: 0.6,
                    notes: 'this is a test event!',
                    id: 1,
                    bandwidth: 10,
                    configuration: 'test configuration',
                    observer: 'test observer',
                    burstAdvocate: 'test advocate',
                    userId: 1,
                    RA: '00:00:00.00',
                    dec: '00:00:00.00',
                    posEr: 0.01,
                    fits: null
                },
            ]
        }
    );
}