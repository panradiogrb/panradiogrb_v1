/**
 * Below are unit tests for testing Delete Event functionality
 * Reference: https://www.prisma.io/docs/orm/prisma-client/testing/unit-testing
 */

import { MockDeleteEvent, MockDeleteObservation } from "../mock_prisma/mock_prisma_functions";
import { prismaMock } from "../mock_prisma/mock_prisma_singleton";
import { Decimal } from "@prisma/client/runtime/library";

test('Delete Mock Event 1', async () => {
    // 1. Mock data
    const eventName = 'Mock Event 1';
    const deletedEventMock = {
        name: eventName,
        date: new Date(),
        creator: 'Mock Creator Name 1',
        observations: []
    };

    // 2. Mock Prisma client behavior
    prismaMock.events.delete.mockResolvedValue(deletedEventMock);

    // 3. Call the function to delete the mocked event
    const result = await MockDeleteEvent(eventName, deletedEventMock);

    // 4. Expectation
    expect(result).toEqual(deletedEventMock);
});

test('Delete Mock Event 2', async () => {
    // 1. Mock data
    const eventName = 'Mock Event 2';
    const deletedEventMock = {
        name: eventName,
        date: new Date(),
        creator: 'Mock Creator Name 2',
        observations: []
    };

    // 2. Mock Prisma client behavior
    prismaMock.events.delete.mockResolvedValue(deletedEventMock);

    // 3. Call the function to delete the mocked event
    const result = await MockDeleteEvent(eventName, deletedEventMock);

    // 4. Expectation
    expect(result).toEqual(deletedEventMock);
});

test('Delete Mock Observation 1', async () => {
    // 1. Mock data
    const observationId = 1;
    const deletedObservationMock = {
        observation_id: observationId,
        parent: '111111A',
        time: new Date(),
        endtime: new Date(),
        duration: new Decimal(2),
        frequency: new Decimal(5),
        bandwidth: new Decimal(6),
        configuration: "Config",
        detection: true,
        flux: new Decimal(8),
        fluxerror: new Decimal(9),
        rms: new Decimal(10),
        notes: 'Notes',
        observer: 'Observer',
        burstadvocate: 'Advocate',
        username: 'Username',
        ra: '5',
        dec: '7',
        poser: new Decimal(2),
        data_processor: 'Processor',
        fits: 'fits',
    };

    // 2. Mock Prisma client behavior
    prismaMock.observations.delete.mockResolvedValue(deletedObservationMock);

    // Call the function to delete the observation
    const result = await MockDeleteObservation(observationId, deletedObservationMock);

    // Expectation
    expect(result).toEqual(deletedObservationMock);
});

test('Delete Mock Observation 2', async () => {
    // 1. Mock data
    const observationId = 2;
    const deletedObservationMock = {
        observation_id: observationId,
        parent: '222222B',
        time: new Date(),
        endtime: new Date(),
        duration: new Decimal(4),
        frequency: new Decimal(15),
        bandwidth: new Decimal(62),
        configuration: "Config",
        detection: true,
        flux: new Decimal(16),
        fluxerror: new Decimal(2),
        rms: new Decimal(1),
        notes: 'Notes',
        observer: 'Observer',
        burstadvocate: 'Advocate',
        username: 'Username',
        ra: '5',
        dec: '7',
        poser: new Decimal(21),
        data_processor: 'Processor',
        fits: 'fits',
    };

    // 2. Mock Prisma client behavior
    prismaMock.observations.delete.mockResolvedValue(deletedObservationMock);

    // Call the function to delete the observation
    const result = await MockDeleteObservation(observationId, deletedObservationMock);

    // Expectation
    expect(result).toEqual(deletedObservationMock);
});