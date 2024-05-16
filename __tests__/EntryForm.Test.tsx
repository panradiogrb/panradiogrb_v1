
import '@testing-library/jest-dom';
import { Observation, GetTestGammaEvent } from '@/components/objects/event';
import { ObservationFormType } from '@/app/(authorised)/dashboard/entry/entry-form';
import { ParseDateString, CalculateDuration, GetFirstDate, GenerateObservations } from '@/lib/form-helpers';
import { MockCreateEvent, MockCreateObservation } from "../mock_prisma/mock_prisma_functions";
import { prismaMock } from "../mock_prisma/mock_prisma_singleton";


//Cleanup the console output when testing as some functions still have debug messages going to console 
beforeAll(() => {
    console.log = jest.fn();
})


describe('EntryForm Test', () => {

    test('Date string is being turned into Date object with time correct in UTC format:', () => {
        const inputDateString: string = '01/01/2000 12:00:00';  //An input string to be tested
        const expectedDate: Date = new Date(Date.UTC(2000, 0, 1, 12, 0, 0));    //An identical Date object as what should be created by the function

        const generatedDate: Date = ParseDateString(inputDateString);   //Parse string input

        expect(generatedDate.toString()).toBe(expectedDate.toString()); //Is the toString() the same?
        expect(generatedDate.getTime()).toBe(expectedDate.getTime());   //Is the time itself the same?

        //Pass if both are good
    });

    test('Duration is correctly calculated:', () => {
        //Create two date objects 2.5 hours apart
        const initDate: Date = new Date('01/01/2000 12:00:00');
        const endDate: Date = new Date('01/01/2000 14:30:00');

        //There is 9000 seconds in 2.5 hours
        const actualDuration: number = 9000

        //Get the calulated duration amount (should return in seconds)
        const calcDuration: number = CalculateDuration(initDate, endDate);

        //Check that the calculated duration equals the actual duration
        expect(calcDuration).toBe(actualDuration);
    })

    test('The earliest date of an observation is correctly recieved:', () => {
        //Get the test GammaBurst object.
        const testObservations: Observation[] = GetTestGammaEvent().observations;
        //This is the earliest date currently in the test gamma event. If the test gamma event changes, this may break.
        const expectedDate: Date = new Date("2024-03-11 03:24:00");

        //Get the calculated earliest date
        const calcEarliestDate: Date = GetFirstDate(testObservations);

        //Compare the both of them
        expect(calcEarliestDate.getTime()).toBe(expectedDate.getTime());
    })

    test('Observations correctly generated:', () => {
        //Mock the form data
        const eventName = 'EventName';
        const formData = new FormData();
        formData.append('observer0', 'testobserver');
        formData.append('advocate0', 'testadvocate');
        formData.append('configuration0', 'testconfig');
        formData.append('startDate0', '25/04/2024');
        formData.append('startTime0', '10:00:10');
        formData.append('endDate0', '25/04/2024');
        formData.append('endTime0', '12:01:15');
        formData.append('frequency0', '1');
        formData.append('bandwidth0', '2');
        formData.append('detection0', 'on');
        formData.append('fluxDensity0', '10');
        formData.append('uncertainty0', '7');
        formData.append('rms0', '3');
        formData.append('notes0', 'testnotes');
        formData.append('RA0', '10:00:00');
        formData.append('dec0', '03:00:10');
        formData.append('posEr0', '3');

        //Mock ObservationFormType object
        const observationFormObject: ObservationFormType = {
            index: 0,
            form: <div>Mock Form</div>, //Mocking React.JSX.Element, can be anything as the formData is handled seperately in this mock
            checked: true,
        };

        //Create the array with the mocked ObservationFormType object
        const observationFormObjects = [observationFormObject];

        //Call the function
        const observations = GenerateObservations(eventName, formData, observationFormObjects);

        //Check that all the values are as they should be
        expect(observations).toHaveLength(1); //Ensure that observations array has correct length
        expect(observations[0].parent).toBe(eventName); //Ensure that parent property is set correctly
        expect(observations[0].observer).toBe('testobserver');
        expect(observations[0].burstAdvocate).toBe('testadvocate');
        expect(observations[0].configuration).toBe('testconfig');
        expect(observations[0].time).toEqual(new Date(Date.UTC(2024, 3, 25, 10, 0, 10))); //Assuming ParseDateString correctly parses the date string (as has been checked). expecting month of 3 cause Date.UTC has count from 0 only for months lol
        expect(observations[0].endTime).toEqual(new Date(Date.UTC(2024, 3, 25, 12, 1, 15))); //Assuming ParseDateString correctly parses the date string (as has been checked). expecting month of 3 for same reason as above
        expect(observations[0].duration).toBe(7265); //Assuming CalculateDuration correctly calculates the duration (as has been checked)
        expect(observations[0].frequency).toBe(1);
        expect(observations[0].bandwidth).toBe(2);
        expect(observations[0].detection).toBe(true);
        expect(observations[0].flux).toBe(10);
        expect(observations[0].fluxError).toBe(7);
        expect(observations[0].RMS).toBe(3);
        expect(observations[0].notes).toBe('testnotes');
        expect(observations[0].RA).toBe('10:00:00');
        expect(observations[0].dec).toBe('03:00:10');
        expect(observations[0].posEr).toBe(3);
        expect(observations[0].fits).toBeNull(); // Assuming fits is not provided in the form data

    });
});

describe('EntryForm Mock Database Test', () => {
    test('Should create an Event and add it to database', async () => {
        // Mock data
        const eventData = {
            name: 'Mocked Event',
            date: new Date('2024-05-10'),
            creator: 'Mock Creator'
        };

        // Mock Prisma client behavior
        prismaMock.events.create.mockResolvedValue(eventData);

        // Call the function with matching event object
        const createdEvent = await MockCreateEvent({
            data: {
                name: 'Mocked Event',
                date: new Date('2024-05-10'),
                creator: 'Mock Creator'
            }
        });

        expect(createdEvent).toEqual(eventData);
    });

    test('Should create an Observation and add it to database', async () => {
        // // Mock data
        // const observationData = {
        //     parent: 'Mocked Event',
        //     time: new Date('2024-05-10T08:00:00Z'),
        //     endtime: new Date('2024-05-10T08:30:00Z'),
        //     duration: 30,
        //     frequency: 100,
        //     bandwidth: 10,
        //     configuration: 'Configuration A',
        //     detection: true,
        //     flux: 0,
        //     fluxerror: 0,
        //     rms: 0,
        //     notes: 'This is a test observation',
        //     observer: 'Observer Name',
        //     burstadvocate: 'Burst Advocate',
        //     userid: 1,
        //     ra: '12:34:56',
        //     dec: '+12:34:56',
        //     poser: 8,
        //     data_processor: 'Data Processor Name'
        // };

        // // Mock Prisma client behavior
        // prismaMock.observations.create.mockResolvedValue(observationData);

        // // Call the function with matching observation object
        // const createdObservation = await MockCreateObservation({
        //     data: observationData
        // });

        // expect(createdObservation).toEqual(observationData);
    });
});