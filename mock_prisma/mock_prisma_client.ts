/**
 * - This file contains separate prisma client for mock testing
 * - Creating a separate client for testing is important to avoid conflicts with development/production prisma client
 * - This will be used to create the mock prisma client object in the 'mock_prisma_singleton.ts' file
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default prisma