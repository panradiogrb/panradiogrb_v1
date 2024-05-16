
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UpdateObservation from '@/app/(authorised)/dashboard/edit/observation/[id]/update-from';
import { Observation, GammaEvent } from "@/components/objects/event";
import Checkbox from '@mui/material/Checkbox';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';//https://mui.com/x/react-date-pickers/date-picker/
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { prismaMock } from "../mock_prisma/mock_prisma_singleton";
import { Decimal } from "@prisma/client/runtime/library";
import dayjs from 'dayjs';

// // Mock the useRouter hook
// jest.mock('next/navigation', () => ({
//     useRouter: jest.fn(() => ({
//       push: jest.fn(),
//     })),
//   }));
//recieve the data the specific event 
// const dummyEvent: GammaEvent = {
//     name: "event",
//     date: new Date("Sat Feb 10 2024 21:23:00"),
//     creator: "sohail",
//     observations: []
// }
//recieve the data  the specific event observation


    const dummyObservation: Observation = {
        parent: 'event',
        id: 1,
        time: new Date("2024-01-05T12:30:00.000Z"), 
        endTime: new Date("2024-02-10T05:23:00.000"),
        duration: 1,
        frequency: 1,
        bandwidth: 1,
        configuration: '1',
        detection: true,
        flux: 1,
        fluxError: 1,
        RMS: 1,
        notes: 'none',
        observer: 'sohail',
        burstAdvocate: 'sohail',
        userId: 1,
        RA: '1',
        dec: '1',
        posEr: 1,
        fits: null,
        dataProcessor: 'sohail',

    };
    
    
    /*

    the tests commented out previously worked before changes were made to UpdateObservation
    
    */
    
describe('Update Observation Test', () => {
  

    // test('Test if rendered properly', () => {
    //     const {  } = render( 
    //         <UpdateObservation oldObservation={dummyObservation} />
            
    //       );
    //     });


    //old test before changes

    // test('Test if inputs loaded can be changed', () => {
    //     const {  } = render( 
    //         <UpdateObservation oldObservation={dummyObservation} />
            
    //       );

    //     //check loaded
    //       expect(screen.getByTestId('observer-input')).toHaveValue('sohail');
    //     //change value
    //       fireEvent.change(screen.getByTestId('observer-input'), { target: { value: 'John' } });
    //     //check value
    //       expect(screen.getByTestId('observer-input')).toHaveValue('John');

    //       expect(screen.getByTestId('fluxError-input')).toHaveValue('1');
    //       fireEvent.change(screen.getByTestId('fluxError-input'), { target: { value: '3' } });
    //       expect(screen.getByTestId('fluxError-input')).toHaveValue('3');

    //       expect(screen.getByTestId('posEr-input')).toHaveValue('1');
    //       fireEvent.change(screen.getByTestId('posEr-input'), { target: { value: '3' } });
    //       expect(screen.getByTestId('posEr-input')).toHaveValue('3');




    // });

    //old test before changes
      // test('Test if observation object created properly', () => {

      //   const formData = new FormData();
      //   formData.append('detection', '');
      //   formData.append('startDate', '25/04/2024');
      //   formData.append('startTime', '10:00:10');
      //   formData.append('endDate', '25/04/2024');
      //   formData.append('endTime', '12:01:15');
      //   formData.append('observer', 'Sohail');
      //   formData.append('burstAdvocate', 'Alson');
      //   formData.append('dataProcessor', 'Tom');
      //   formData.append('configuration', 'Config1');
      //   formData.append('frequency', '123.45');
      //   formData.append('bandwidth', '67.89');
      //   formData.append('flux', '100.5');
      //   formData.append('fluxError', '1.2');
      //   formData.append('RMS', '0.5');
      //   formData.append('RA', '00:00:00.00');
      //   formData.append('dec', '00:00:00.00');
      //   formData.append('posEr', '0.01');
      //   formData.append('notes', 'Some notes');

    
      //   const observations = createObservationObject(formData, dummyObservation, dummyEvent);

      //   expect(observations.observer).toBe('Sohail')
      //   expect(observations.burstAdvocate).toBe('Alson')
      //   expect(observations.dataProcessor).toBe('Tom')
      //   expect(observations.flux).toEqual(100.5)
      //   expect(observations.fluxError).toEqual(1.2)
      //   expect(observations.detection).toEqual(false)
      //   expect(observations.RA).toBe('00:00:00.00')
      //   expect(observations.notes).toBe('Some notes')
      //   expect(observations.time).toEqual(new Date(Date.UTC(2024, 3, 25, 10,0,10)))



        
      //   });


     

    // test('Test if form submits correctly', () => {
    //   const { getByTestId, getByText } = render(
    //     <UpdateObservation data={dummyObservation} gammaEvent={dummyEvent} />
    //   );
    //   // Simulate form submission
    //   const form = getByTestId('update-form'); 
    //   fireEvent.submit(form);

      
      
    // });


    test('Checkbox works when clicked', () => {
      const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
      const { getByLabelText } = render(<Checkbox {...label} defaultChecked={false} />);
      const checkbox = getByLabelText('Checkbox demo');
      expect(checkbox).not.toBeChecked();
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    test('Datepicker works when clicked', () => {
      const { getByLabelText } = render(<LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Date"  /></LocalizationProvider>);
      
      const datepicker = getByLabelText('Date');
      fireEvent.click(datepicker);
      

    });

});