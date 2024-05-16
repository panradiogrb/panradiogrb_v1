/**
 * - This file contains identical methods that use Prisma for database interactions, except they're using the Mock Prisma Client.
 * - The purpose of creating identical methods using the Mock Prisma Client, is so that we can set a mock result as the expected return in unit tests, instead of calling the actual database
 * - These functions, along with the mocked prisma object exported in the singleton file, will be used together in the prisma based unit tests
 */

// Import the default export of 'mock prisma client' to get the reference to a prisma client to make the mock object based off
import prisma from './mock_prisma_client'

/*******************************************************
 * MOCK METHOD: Fetches list of all GRB Events in database
 *******************************************************/
export async function MockFetchGammaEvents() {
    try {
        const events = await prisma.events.findMany();
        return events;
    } catch (error) {
        throw new Error('Failed to fetch total list of events');
    }
}

/*******************************************************
 * MOCK METHOD: Fetches selected GRB Event in database
 *******************************************************/
export async function MockFetchSelectedEvent(event: string) {
    try {
        const selectedEvent = await prisma.events.findUnique({
            where: {
                name: event // Search event table for an event where it's 'name' value is equal to the 'event' parameter received from the function
            }
        });

        return selectedEvent;
    } catch (error) {
        throw new Error(`fetchSelectedEvent(): Failed to fetch data for event '${event}'`);
    }
}

/**************************************************************
 * MOCK METHOD: Fetches list of observations for select event name
 **************************************************************/
export async function MockFetchSelectedObservations(selectedEventName: string) {
    try {
        const selectedObservations = await prisma.observations.findMany({
            where: {
                parent: selectedEventName   // Return observation objects only if their 'parent' field value matches the 'selectedEventName' attribute
            }
        });

        return selectedObservations;
    } catch (error) {
        throw new Error(`fetchSelectedObservations(): Failed to fetch observation records for event '${selectedEventName}'`);
    }
}

/*************************************
 * MOCK METHOD: Create Event record
 *************************************/
export async function MockCreateEvent(data: any) {
    try {
        const createdEvent = await prisma.events.create({ data });
        return createdEvent
    } catch (error) {
        throw new Error(`MockCreateEvent(): Failed to create Mock event`);
    }
}

/*****************************************
 * MOCK METHOD: Create Observation record
 *****************************************/
export async function MockCreateObservation(data: any) {
    try {
        const createdObservation = await prisma.observations.create({ data });
        return createdObservation;
    } catch (error) {
        throw new Error(`MockCreateObservation(): Failed to create Mock observation`);
    }
}

/*****************************************
 * MOCK METHOD: Update Observation record
 *****************************************/
export async function MockUpdateObservation(id: number, data: any) {
    try {
        const createdObservation = await prisma.observations.update({
            where: {
                observation_id: id,
            },
            data: data
        });
        return createdObservation;
    } catch (error) {
        throw new Error(`MockUpdateObservation(): Failed to update mock observation`);
    }
}

/*****************************************
 * MOCK METHOD: Delete Event
 *****************************************/
export async function MockDeleteEvent(eventToDelete: string, data: any) {
    try {
        const deletedEvent = await prisma.events.delete({
            where: {
                name: eventToDelete
            }
        });
        return deletedEvent;
    } catch (error) {
        throw new Error(`MockDeleteEvent(): Failed to delete mock event`);
    }
}

/*****************************************
 * MOCK METHOD: Delete Observation
 *****************************************/
export async function MockDeleteObservation(observationToDelete: number, data: any) {
    try {
        const deletedObservation = await prisma.observations.delete({
            where: {
                observation_id: observationToDelete
            }
        });
        return deletedObservation;
    } catch (error) {
        throw new Error(`MockDeleteObservation(): Failed to delete mock observation`);
    }
}