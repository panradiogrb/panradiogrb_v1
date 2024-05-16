/**
 * This file contains schemas created with the library 'zod' to make sure the data being retrieved from entry form is in the correct format
 * References:
 * - https://zod.dev/
 * - https://www.youtube.com/watch?v=AeQ3f4zmSMs&t=140s&ab_channel=ByteGrad
 * - https://www.youtube.com/watch?v=tLhcyBfljYo&ab_channel=ByteGrad
 */

import { z } from 'zod';

/**
 * EVENT SCHEMA
 */
export const EventSchema = z.object({
    name: z.string(),
    date: z.date(),
    creator: z.string()
})

/**
 * OBSERVATION DETECTION SCHEMA
 */
export const DetectionObservationSchema = z.object({
    parent: z.string().regex(/^\d{6}[A-Z]+$/, { message: 'Event name needs to follow the format of 6 consecutive digits, and any sequence of capitals letters (e.g. 240401, 240401A, 240401AB, 240401ABC)' }),
    time: z.date({
        errorMap: (issue, { defaultError }) => ({
            message: issue.code === "invalid_date" ? "Provide a valid 'Start Date'" : defaultError, // Used the following resource to create custom message: https://github.com/colinhacks/zod/issues/1526
        }),
    }),
    endtime: z.date({
        errorMap: (issue, { defaultError }) => ({
            message: issue.code === "invalid_date" ? "Provide a valid 'End Date'" : defaultError, // Used the following resource to create custom message: https://github.com/colinhacks/zod/issues/1526
        }),
    }),
    duration: z.number({ message: "Duration value must be a valid number" }),
    frequency: z.number({ message: "Frequency value must be a valid number" }).min(0, { message: "Frequency value must be greater than or equal to 0" }),
    bandwidth: z.number({ message: "Bandwidth value must be a valid number" }).min(0, { message: "Bandwidth value must be greater than or equal to 0" }),
    configuration: z.string(),
    detection: z.boolean(),
    flux: z.number({ message: "Flux Density value must be a valid number" }).min(0, { message: "Flux Density value must be greater than or equal to 0" }),
    fluxerror: z.number({ message: "Flux Density Error value must be a valid number" }).min(0, { message: "Frequency Density value must be greater than or equal to 0" }),
    rms: z.number({ message: "RMS value must be a valid number" }).min(0, { message: "RMS value must be greater than or equal to 0" }),
    notes: z.string(),
    observer: z.string().min(3),
    burstadvocate: z.string().min(3),
    userid: z.number(),
    ra: z.string().regex(/^\d{2}:\d{2}:\d{2}\.\d{2}$/, {
        message: "RA value must be in the format (hh:mm:ss.ss)"
    }),
    dec: z.string().regex(/^\d{2}:\d{2}:\d{2}\.\d{2}$/, {
        message: "Dec value must be in the format (dd:mm:ss.ss)"
    }),
    poser: z.number({ message: "Positional Error value must be a valid number" }).min(0, { message: "Positional Error value must be greater than or equal to 0" }),
    data_processor: z.string().min(3)
});

/**
 * OBSERVATION NON DETECTION SCHEMA
 * - difference between non-detection schema and detection schema is that non-detection makes 'flux' and 'fluxerror' optional fields
 */
export const NonDetectionObservationSchema = z.object({
    parent: z.string().regex(/^\d{6}[A-Z]+$/, { message: 'Event name needs to follow the format of 6 consecutive digits, and any sequence of capitals letters (e.g. 240401, 240401A, 240401AB, 240401ABC)' }),
    time: z.date({
        errorMap: (issue, { defaultError }) => ({
            message: issue.code === "invalid_date" ? "Provide a valid 'Start Date'" : defaultError, // Used the following resource to create custom message: https://github.com/colinhacks/zod/issues/1526
        }),
    }),
    endtime: z.date({
        errorMap: (issue, { defaultError }) => ({
            message: issue.code === "invalid_date" ? "Provide a valid 'End Date'" : defaultError, // Used the following resource to create custom message: https://github.com/colinhacks/zod/issues/1526
        }),
    }),
    duration: z.number({ message: "Frequency value must be a valid number" }),
    frequency: z.number({ message: "Frequency value must be a valid number" }).min(0, { message: "Frequency value must be greater than or equal to 0" }),
    bandwidth: z.number({ message: "Bandwidth value must be a valid number" }).min(0, { message: "Bandwidth value must be greater than or equal to 0" }),
    configuration: z.string(),
    detection: z.boolean(),
    flux: z.number({ message: "Flux Density value must be a valid number" }).optional(),
    fluxerror: z.number({ message: "Flux Density Error value must be a valid number" }).optional(),
    rms: z.number({ message: "RMS value must be a valid number" }).min(0, { message: "RMS value must be greater than or equal to 0" }),
    notes: z.string(),
    observer: z.string().min(3),
    burstadvocate: z.string().min(3),
    userid: z.number(),
    ra: z.string().regex(/^\d{2}:\d{2}:\d{2}\.\d{2}$/, {
        message: "RA value must be in the format (hh:mm:ss.ss)"
    }),
    dec: z.string().regex(/^\d{2}:\d{2}:\d{2}\.\d{2}$/, {
        message: "Dec value must be in the format (dd:mm:ss.ss)"
    }),
    poser: z.number({ message: "Positional Error value must be a valid number" }).min(0, { message: "Positional Error value must be greater than or equal to 0" }),
    data_processor: z.string().min(3)
});