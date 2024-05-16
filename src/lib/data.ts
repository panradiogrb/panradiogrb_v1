/**
 * This file contains all data access methods for fetching Event, Observation and or FITS Image data from the RDS PostgreSQL database.
 * This follows the practice recommended by the Next.js Official Documentation
 * Reference: https://nextjs.org/learn/dashboard-app/fetching-data#fetching-data-for-revenuechart 
 */

import { GammaEvent, Observation } from '@/components/objects/event';   // Type declarations for Events and Observations
import { unstable_noStore as noStore } from 'next/cache';               // noStore() function for stopping data from being cached, as data from database will change frequently
import { prisma } from '@/lib/db'

/*******************************************************
 * METHOD: Fetches list of all GRB Events in database
 *******************************************************/
export async function fetchGammaEvents() {
    noStore();  // Stops event data retrieved from the database being cached (enabling dynamic data rendering), which is better for displaying data that changes often

    try {
        const events = await prisma.events.findMany();
        return events;
    } catch (error) {
        throw new Error('Failed to fetch total list of events');
    }
}

/*******************************************************
 * METHOD: Fetches selected GRB Event in database
 *******************************************************/
export async function fetchSelectedEvent(event: string) {
    noStore();  // Stops event data retrieved from the database being cached (enabling dynamic data rendering), which is better for displaying data that changes often

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
 * METHOD: Fetches list of observations for select event name
 **************************************************************/
export async function fetchSelectedObservations(selectedEventName: string) {
    noStore();  // Stops event data retrieved from the database being cached (enabling dynamic data rendering), which is better for displaying data that changes often

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

/**************************************************************
 * METHOD: Fetches an observation record by id
 **************************************************************/
export async function fetchObservationById(id: number) {
    noStore();  // Stops event data retrieved from the database being cached (enabling dynamic data rendering), which is better for displaying data that changes often

    try {
        const observation = await prisma.observations.findUnique({
            where: {
                observation_id: id
            }
        })

        return observation;
    } catch (error) {
        throw new Error(`fetchObservationById(): Failed to fetch observation with id '${id}'`);
    }
}

/**************************************************************
 * METHOD: Fetches an image record by observation id
 **************************************************************/
export async function fetchImageById(id: number) {
    noStore();  // Stops event data retrieved from the database being cached (enabling dynamic data rendering), which is better for displaying data that changes often

    try {
        const image = await prisma.images.findFirst({  // Should ideally be using findUnique, but couldn't get it to work
            where: {
                observation_id: id
            }
        })

        return image;
    } catch (error) {
        throw new Error(`fetchImageById(): Failed to fetch image with observation id '${id}'`);
    }
}