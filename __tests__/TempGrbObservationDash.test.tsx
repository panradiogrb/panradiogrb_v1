import '@testing-library/jest-dom'
import { observationData } from '../src/app/temp-grb-observations/grbObservations';

describe('GRB Event Observation type test', () => {
    it('should have observations with the correct field types', () => {
        observationData.forEach((observation, index) => {

            // Check observation type
            expect(observation).toHaveProperty('type');
            expect(typeof observation.type).toBe('string');
            expect(['detection']).toContain(observation.type);

            // Check observation time
            expect(observation).toHaveProperty('observationTime');
            expect(typeof observation.observationTime).toBe('object');

            // Check for data field type
            expect(observation).toHaveProperty('data');
            expect(typeof observation.data).toBe('object');

            // Check for date type
            expect(observation.data).toHaveProperty('date');
            expect(typeof observation.data.date).toBe('string');

            // Check for start time type
            expect(observation.data).toHaveProperty('startTime');
            expect(typeof observation.data.startTime).toBe('string');

            // Check for end time type
            expect(observation.data).toHaveProperty('endTime');
            expect(typeof observation.data.endTime).toBe('string');

            // Check for frequency type
            expect(observation.data).toHaveProperty('frequency');
            expect(typeof observation.data.frequency).toBe('number');

            // Check for flux density type
            expect(observation.data).toHaveProperty('fluxDensity');
            expect(typeof observation.data.fluxDensity).toBe('number');

            // Check for flux density error type
            expect(observation.data).toHaveProperty('fluxDensityError');
            expect(typeof observation.data.fluxDensityError).toBe('number');

            // Check for rms type
            expect(observation.data).toHaveProperty('rms');
            expect(typeof observation.data.rms).toBe('number');

            // Check for observationTime properties
            expect(observation.observationTime).toHaveProperty('middleTime');
            expect(typeof observation.observationTime.middleTime).toBe('string');

            expect(observation.observationTime).toHaveProperty('length');
            expect(typeof observation.observationTime.length).toBe('number');
        });
    });
});
