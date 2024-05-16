


//Mock the 2 function calls
jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
    useRouter: jest.fn(() => ({
        push: jest.fn(),
    })),
}))

const mockUseState = jest.fn();
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: (initialValue: boolean) => {
        const state = initialValue;
        const setState = jest.fn();
        return [state, setState];
    },
}))

jest.mock('@headlessui/react', () => ({
    Dialog: () => {return (<div></div>)},
    Transition: () => {return (<div></div>)},
}));

// jest.mock('@headlessui/react', () => ({
//     Dialog: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
//     Transition: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
// }));

import React, { useState } from 'react';
import '@testing-library/jest-dom'
import LogoutDialog from '@/components/logout-dialog';
import { render } from '@testing-library/react';

//Cleanup the console output when testing as the mock of dialogue & transition doesn't include unecessary functions and we get warnings for that
//The test still works as we can render the logout component without fully implemented dialog & transition components.
beforeAll(() => {
    console.log = jest.fn();
    console.error = jest.fn();
    console.warn = jest.fn();
})

describe('Testing logout functionality: ', () => {
    test('Does the logout dialoge display?', () => {
        const [state, setState] = useState<boolean>(false);

        mockUseState.mockReturnValue([state, setState]);

        const logoutDialog: React.JSX.Element = (<LogoutDialog/>);

        const { getByText } = render(logoutDialog);

        //'Rendertext' is a hidden element in the logout dialog at the root div. I use it so I can check if the logout dialogue has properly rendered
        expect(getByText('Rendertext')).toBeInTheDocument();
    });
})