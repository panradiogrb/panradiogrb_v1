

//Mock the 2 function calls
jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
    useRouter: jest.fn(),
    useSelectedLayoutSegments: jest.fn(() => {
        return ['test','test']
    }),
}))

import React from 'react';
import { render } from '@testing-library/react';
import DashboardNavbar from '../src/components/ui/navbar/navbar';
import '@testing-library/jest-dom'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { useRouter } from 'next/router';

test('renders dashboard navbar', () => {
    const { getByText } = render(<DashboardNavbar loggedUserName={'Gemma'} loggedUserRole={'Admin'} />);
    //These simple tests are just to make sure that the component is rendering without crashing.
    //If it does, it can be expected that the titles of the menu options will be in the document
    expect(getByText('Database')).toBeInTheDocument();
    expect(getByText('New')).toBeInTheDocument();
    expect(getByText('Gemma')).toBeInTheDocument();

});