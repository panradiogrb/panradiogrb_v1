/**
 * This file creates a mock object of the separate prisma client in 'mock_prisma_client.ts', which is created for unit testing with prisma
 * Reference: https://www.prisma.io/docs/orm/prisma-client/testing/unit-testing 
 */

import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

// 1. Import the default export of 'mock prisma client' to get the reference to a prisma client to make the mock object based off
import prisma from './mock_prisma_client'

// 2. Creates the mock prisma client
jest.mock('./mock_prisma_client', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}))

// 3. A function for resetting the mock object before each test run
beforeEach(() => {
    mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>