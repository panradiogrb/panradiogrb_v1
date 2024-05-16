import { DataTable } from '@/components/database-table';
import React from 'react';
import { render, fireEvent, queryByText, getByDisplayValue, getByAltText } from '@testing-library/react';
import '@testing-library/jest-dom';
import { columns } from '@/app/(authorised)/dashboard/database/columns';


// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const mockData = [
  {
    event: "Event 1",
    date: new Date("12/3/25"),
    creator: "Gemma",
    view: "Graph", 
  },
  {
    event: "Event 2",
    date: new Date("12/4/24"),
    creator: "Alson",
    view: "Graph", 
  },
  {
    event: "Event 3",
    date: new Date("11/12/24"),
    creator: "Gemma",
    view: "Graph", 
  },

  {
    event: "Event 6",
    date: new Date("11/3/24"),
    creator: "Sohail",
    view: "Graph", 
  },
  {
    event: "Event 5",
    date: new Date("1/3/24"),
    creator: "Tom",
    view: "Graph", 
  },
];

/*
jest testing filtering for database table
*/

describe('DataTable', () => {

  test('Filters events correctly', () => {
    const { getByPlaceholderText, getByText, queryByText } = render( 
      <DataTable columns={columns} data={mockData} />
    );

    const eventInput = getByPlaceholderText('Filter events...');
    fireEvent.change(eventInput, { target: { value: 'Event 1' } });

    expect(getByText('Event 1')).toBeInTheDocument();
    expect(queryByText('Event 2')).toBeNull(); 
    expect(queryByText('Event 3')).toBeNull(); 
  });

  test('Filters dates correctly', () => {
    const { getByPlaceholderText, getByText, queryByText } = render( 
      <DataTable columns={columns} data={mockData} />
    );
    const dateInput = getByPlaceholderText('Filter date...');

    //test 1
    fireEvent.change(dateInput, { target: { value: '03/12/2025' } });
    expect(getByText('03/12/2025')).toBeInTheDocument();
    expect(queryByText('04/12/2024')).toBeNull(); 
    expect(queryByText('12/11/2024')).toBeNull(); 

    //test 2
    fireEvent.change(dateInput, { target: { value: '12/11/2024' } });
    expect(getByText('12/11/2024')).toBeInTheDocument();
    expect(queryByText('03/12/2025')).toBeNull(); 
    expect(queryByText('04/12/2024')).toBeNull(); 

    //test 3
    fireEvent.change(dateInput, { target: { value: '04/12/2024' } });
    expect(getByText('04/12/2024')).toBeInTheDocument();
    expect(queryByText('03/12/2025')).toBeNull(); 
    expect(queryByText('12/11/2024')).toBeNull(); 

    
  });

  test('Filters creators correctly', () => {
    const { getByPlaceholderText, getByText, queryByText } = render( 
      <DataTable columns={columns} data={mockData} />
    );
    fireEvent.click(getByText("Columns"))

    const eventInput = getByPlaceholderText('Filter creator...');
    fireEvent.change(eventInput, { target: { value: 'Alson' } });

   //expect(getByText('Alson')).toBeInTheDocument();
    expect(queryByText('Sohail')).toBeNull(); 
    expect(queryByText('Tom')).toBeNull(); 
  });
  
});
