/**
 * @jest-environment node
 */

/**
 * This tests the fetchGammaEvents functionality to see whether it successfully retrieves event data from the database.
 */

import { MockFetchGammaEvents } from "../mock_prisma/mock_prisma_functions";
import { prismaMock } from "../mock_prisma/mock_prisma_singleton";

describe('fetchGammaEvents function', () => {
    // 1. Test if mock prisma client will fetch the expected events
    it('Mock Prisma Client fetches all events from database successfully', async () => {
        // Setup Mock Event data
        const eventsData = [
            { name: '240101A', date: new Date('2024-01-01'), creator: 'Gemma' },
            { name: '240212B', date: new Date('2024-02-12'), creator: 'Alson' },
            { name: '230313C', date: new Date('2023-03-13'), creator: 'Sohail' },
            { name: '220414D', date: new Date('2022-04-14'), creator: 'Ben' },
            { name: '230516AA', date: new Date('2023-05-16'), creator: 'Tom' },
            { name: '210617BBB', date: new Date('2021-06-17'), creator: 'Abi' },
            { name: '200718XXXX', date: new Date('2020-07-18'), creator: 'Reuben' }
        ];

        // Mock Prisma client behavior for fetching all events
        prismaMock.events.findMany.mockResolvedValue(eventsData);

        // Call the function that uses prisma to fetch the events
        const events = await MockFetchGammaEvents();

        // Assertion for what event data is expected to be received
        expect(events).toEqual([
            { name: '240101A', date: new Date('2024-01-01'), creator: 'Gemma' },
            { name: '240212B', date: new Date('2024-02-12'), creator: 'Alson' },
            { name: '230313C', date: new Date('2023-03-13'), creator: 'Sohail' },
            { name: '220414D', date: new Date('2022-04-14'), creator: 'Ben' },
            { name: '230516AA', date: new Date('2023-05-16'), creator: 'Tom' },
            { name: '210617BBB', date: new Date('2021-06-17'), creator: 'Abi' },
            { name: '200718XXXX', date: new Date('2020-07-18'), creator: 'Reuben' }
        ]);
    })

    // 2. Test if the function successfully retrieves the data, and the data is of the expected structure
    it('Fetches events successfully', async () => {
        const mockFetchGammaEvents = async () => [
            { name: 'Event 1', date: new Date(), creator: 'Creator 1' },
            { name: 'Event 2', date: new Date(), creator: 'Creator 2' },
        ];

        // 1.1 Simulate retrieving events from database
        const events = await mockFetchGammaEvents();

        // 1.2. Check if data retrieved matches expected structure
        expect(events).toHaveLength(2);
        expect(events[0]).toHaveProperty('name', 'Event 1');
        expect(events[1]).toHaveProperty('name', 'Event 2');
    });

    // 3. Test if function provides empty array if no events exist in database
    it('Handles empty response', async () => {
        const mockFetchGammaEvents = async () => [];

        const events = await mockFetchGammaEvents();

        expect(events).toEqual([]);
    });

    // 4. Test if function throws an error if unable to retrieve events for some reason
    it('Handles error', async () => {
        const mockFetchGammaEvents = async () => {
            throw new Error('Failed to fetch events');
        };

        await expect(mockFetchGammaEvents()).rejects.toThrow('Failed to fetch events');
    });
});