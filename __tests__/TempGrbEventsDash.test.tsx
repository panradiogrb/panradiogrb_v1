/**
 * These unit tests display that the regex expression successfully 
 * validate correct and incorrect strings passed as values for GRB Event Names 
 * and Times, which ensure that user input for new GRB Events are properly tested.
 * 
 * 
 * Reference: https://jestjs.io/docs/api#describename-fn
 */

import { eventNameRegex, utcRegex } from '@/lib/regex';

describe('GRB Event unit tests for input validation and successful POST requests', () => {
    // 1. Testing Event Name regex to detect valid event names
    test('Should validate valid GRB Event Names', () => {
        const validNames = ['220501X', '240401A', '240401AB', '240401ABC'];
        validNames.forEach(name => {
            expect(eventNameRegex.test(name)).toBe(true);
        });
    });

    // 2. Testing Event Name regex to detect invalid event names
    test('should not validate invalid GRB Event Names', () => {
        const invalidNames = ['abc', '2404', '240401abC', '24040A1', '240405'];
        invalidNames.forEach(name => {
            expect(eventNameRegex.test(name)).toBe(false);
        });
    });

    // 3. Testing Event Time regex to detect valid event times in UTC format
    test('Should validate valid GRB Event Times', () => {
        const validTimes = ['12:00', '23:59', '00:00', '06:30', '19:45'];
        validTimes.forEach(time => {
            expect(utcRegex.test(time)).toBe(true);
        });
    });

    // 4. Testing Event Time regex to detect invalid event times in non-UTC format
    test('Should validate invalid GRB Event Times', () => {
        const invalidTimes = ['25:00', '10:70', '3:00', '09:5', '12:345', 'abc', '00: 00'];
        invalidTimes.forEach(time => {
            expect(utcRegex.test(time)).toBe(false);
        });
    });
});
