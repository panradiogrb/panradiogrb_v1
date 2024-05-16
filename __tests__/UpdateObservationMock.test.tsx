/**
 * Below are unit tests for testing Update Observation functionality
 * Reference: https://www.prisma.io/docs/orm/prisma-client/testing/unit-testing
 */

import { MockUpdateObservation } from "../mock_prisma/mock_prisma_functions";
import { prismaMock } from "../mock_prisma/mock_prisma_singleton";
import { Decimal } from "@prisma/client/runtime/library";

test('Observation Update 1', async () => {
    // 1. Mock data
    const observationId = 1;
    const updatedObservationMock = {
        observation_id: 1,
        parent: '240101A',
        time: new Date(),
        endtime: new Date(),
        duration: new Decimal(2),
        frequency: new Decimal(5),
        bandwidth: new Decimal(6),
        configuration: "Updated Config 1",
        detection: true,
        flux: new Decimal(8),
        fluxerror: new Decimal(9),
        rms: new Decimal(10),
        notes: 'Updated notes 1',
        observer: 'Alson Updated 1',
        burstadvocate: 'Updated Advocate 1',
        username: 'UPDATED supabase username here 1',
        ra: '5',
        dec: '7',
        poser: new Decimal(2),
        data_processor: 'Updated Processor 1',
        fits: 'fits'
    };

    // 2. Mock Prisma client behavior
    prismaMock.observations.update.mockResolvedValue(updatedObservationMock);

    // 3. Call the function to update observation
    const result = await MockUpdateObservation(observationId, updatedObservationMock);

    // 4. Expectation
    expect(result).toEqual(updatedObservationMock);
});

test('Observation Update 2', async () => {
    // 1. Mock data
    const observationId = 2;
    const updatedObservationMock = {
        observation_id: 2,
        parent: '240202B',
        time: new Date(),
        endtime: new Date(),
        duration: new Decimal(2),
        frequency: new Decimal(5),
        bandwidth: new Decimal(6),
        configuration: "Updated Config 2",
        detection: true,
        flux: new Decimal(8),
        fluxerror: new Decimal(9),
        rms: new Decimal(10),
        notes: 'Updated notes 2',
        observer: 'Alson Updated 2',
        burstadvocate: 'Updated Advocate 2',
        username: 'UPDATED supabase username here 2',
        ra: '8',
        dec: '2',
        poser: new Decimal(4),
        data_processor: 'Updated Processor 2',
        fits: 'fits 2'
    };

    // 2. Mock Prisma client behavior
    prismaMock.observations.update.mockResolvedValue(updatedObservationMock);

    // 3. Call the function to update observation
    const result = await MockUpdateObservation(observationId, updatedObservationMock);

    // 4. Expectation
    expect(result).toEqual(updatedObservationMock);
});

test('Observation Update 3', async () => {
    // 1. Mock data
    const observationId = 3;
    const updatedObservationMock = {
        observation_id: 3,
        parent: '240303C',
        time: new Date(),
        endtime: new Date(),
        duration: new Decimal(4),
        frequency: new Decimal(7),
        bandwidth: new Decimal(8),
        configuration: "Updated Config 3",
        detection: true,
        flux: new Decimal(9),
        fluxerror: new Decimal(2),
        rms: new Decimal(12),
        notes: 'Updated notes 3',
        observer: 'Alson Updated 3',
        burstadvocate: 'Updated Advocate 3',
        username: 'UPDATED supabase username here 3',
        ra: '8',
        dec: '2',
        poser: new Decimal(6),
        data_processor: 'Updated Processor 3',
        fits: 'fits 3'
    };

    // 2. Mock Prisma client behavior
    prismaMock.observations.update.mockResolvedValue(updatedObservationMock);

    // 3. Call the function to update observation
    const result = await MockUpdateObservation(observationId, updatedObservationMock);

    // 4. Expectation
    expect(result).toEqual(updatedObservationMock);
});

test('Observation Update 4', async () => {
    // 1. Mock data
    const observationId = 4;
    const updatedObservationMock = {
        observation_id: 2,
        parent: '240404D',
        time: new Date(),
        endtime: new Date(),
        duration: new Decimal(5),
        frequency: new Decimal(7),
        bandwidth: new Decimal(22),
        configuration: "Updated Config 4",
        detection: true,
        flux: new Decimal(85),
        fluxerror: new Decimal(91),
        rms: new Decimal(10),
        notes: 'Updated notes 4',
        observer: 'Alson Updated 4',
        burstadvocate: 'Updated Advocate 4',
        username: 'UPDATED supabase username here 4',
        ra: '8',
        dec: '2',
        poser: new Decimal(4),
        data_processor: 'Updated Processor 4',
        fits: 'fits 4'
    };

    // 2. Mock Prisma client behavior
    prismaMock.observations.update.mockResolvedValue(updatedObservationMock);

    // 3. Call the function to update observation
    const result = await MockUpdateObservation(observationId, updatedObservationMock);

    // 4. Expectation
    expect(result).toEqual(updatedObservationMock);
});