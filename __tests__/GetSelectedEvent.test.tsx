/**
 * @jest-environment node
 */

import { Observation } from "@/components/objects/event";
import { MockFetchSelectedEvent, MockFetchSelectedObservations } from "../mock_prisma/mock_prisma_functions";
import { prismaMock } from "../mock_prisma/mock_prisma_singleton";

test('Should fetch the selected GRB Event from the database', async () => {
    // Mock data
    const eventName = '240101AAAAAA';
    const eventData = { name: '240101AAAAAA', date: new Date('2024-01-11'), creator: 'Alson' };

    // Mock Prisma client behavior
    prismaMock.events.findUnique.mockResolvedValue(eventData);

    // Call the function
    const selectedEvent = await MockFetchSelectedEvent(eventName);

    // Expectation
    expect(selectedEvent).toEqual(eventData);
});

test('Should throw an error if failed to fetch selected GRB Event', async () => {
    // Mock Prisma client behavior
    prismaMock.events.findUnique.mockRejectedValue(new Error('Database error'));

    // Call the function and expect it to throw an error
    await expect(MockFetchSelectedEvent('Nonexistent Event')).rejects.toThrow(
        "fetchSelectedEvent(): Failed to fetch data for event 'Nonexistent Event'"
    );
});

// test('Should fetch observations for the selected event from the database', async () => {
//     // Mock data
//     const selectedEventName = 'Event 1';
//     const observationData = [
//         {
//             observation_id: 1,
//             parent: 'Event 1',
//             time: new Date('2024-05-01T00:00:00.000Z'),
//             endtime: new Date('2024-05-01T01:00:00.000Z'),
//             duration: 3600,
//             frequency: 50,
//             bandwidth: 10,
//             configuration: 'Configuration 1',
//             detection: true,
//             flux: 10,
//             fluxerror: 0.5,
//             rms: 0.1,
//             notes: 'Observation notes 1',
//             observer: 'Observer 1',
//             burstadvocate: 'Burst Advocate 1',
//             userid: 1,
//             ra: 'RA 1',
//             dec: 'Dec 1',
//             poser: 0.01,
//             fits: null,
//             data_processor: 'Data Processor 1',
//         },
//         {
//             observation_id: 2,
//             parent: 'Event 1',
//             time: new Date('2024-05-01T01:00:00.000Z'),
//             endtime: new Date('2024-05-01T02:00:00.000Z'),
//             duration: 3600,
//             frequency: 50,
//             bandwidth: 10,
//             configuration: 'Configuration 2',
//             detection: true,
//             flux: 15,
//             fluxerror: 0.7,
//             rms: 0.2,
//             notes: 'Observation notes 2',
//             observer: 'Observer 2',
//             burstadvocate: 'Burst Advocate 2',
//             userid: 2,
//             ra: 'RA 2',
//             dec: 'Dec 2',
//             poser: 0.02,
//             fits: null,
//             data_processor: 'Data Processor 2',
//         },
//         {
//             observation_id: 3,
//             parent: 'Event 2',
//             time: new Date('2024-05-02T00:00:00.000Z'),
//             endtime: new Date('2024-05-02T01:00:00.000Z'),
//             duration: 3600,
//             frequency: 50,
//             bandwidth: 10,
//             configuration: 'Configuration 3',
//             detection: true,
//             flux: 20,
//             fluxerror: 1.0,
//             rms: 0.3,
//             notes: 'Observation notes 3',
//             observer: 'Observer 3',
//             burstadvocate: 'Burst Advocate 3',
//             userid: 3,
//             ra: 'RA 3',
//             dec: 'Dec 3',
//             poser: 0.03,
//             fits: null,
//             data_processor: 'Data Processor 3'
//         }
//     ];

//     // Mock Prisma client behavior
//     prismaMock.observations.findMany.mockResolvedValue(observationData);

//     // Call the function
//     const observations = await MockFetchSelectedObservations(selectedEventName);

//     // Expectation
//     expect(observations).toEqual(observationData);
// });


test('Should throw an error if failed to fetch observations for selected event', async () => {
    // Mock Prisma client behavior
    prismaMock.observations.findMany.mockRejectedValue(new Error('Database error'));

    // Call the function and expect it to throw an error
    await expect(MockFetchSelectedObservations('Nonexistent Event')).rejects.toThrow(
        "fetchSelectedObservations(): Failed to fetch observation records for event 'Nonexistent Event'"
    );
});
