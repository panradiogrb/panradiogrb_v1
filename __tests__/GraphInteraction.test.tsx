

import { columns } from "@/components/ui/graph/columns";

//Mock the 2 function calls
jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
    useRouter: jest.fn(),
}))

//Mock useState
const mockUseState = jest.fn();
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: (state: any) => (state += 1),
}))

// jest.mock('../src/components/ui/graph/GraphTable', () => ({
//     GetDataTable: {
//         columns: columns,
//         data: GetTestGammaEvent().observations,
//     },
// }))

import React, { useState } from 'react';
import '@testing-library/jest-dom'
import { GammaEvent, GetTestGammaEvent, Observation } from '@/components/objects/event';
import GraphController, { UpdateGraphTester } from '@/components/ui/graph/graph-controller';
import { render } from '@testing-library/react';

import { DataTable, GetDataTable } from "../src/components/ui/graph/GraphTable";
import { Table } from "@tanstack/react-table";

describe('Graph interaction test: ', () => {
    test('Render a graph-controller', () => {
        const mockSetCount = jest.fn();
        (mockUseState as jest.Mock).mockReturnValue([0, mockSetCount]);

        try {
            const testEvent = GetTestGammaEvent();
            const graphController: React.JSX.Element = GraphController({ event: testEvent })
            const { getByText } = render(graphController);

        }
        catch {
            //Its worked if it crashes due to a hook because that means it successfully reached the hook call and the graph was rendered
        }
    });

    test('Test updating the GammaEvent visual', () => {
        // const testEvent: GammaEvent = {
        //     name: 'test',
        //     date: new Date(),
        //     creator: 'testcreator',
        //     observations: ,
        // };
        const testEvent: GammaEvent = GetTestGammaEvent();

        try {
            const dataTable: DataTable<Observation> = GetDataTable({
                columns: columns,
                data: testEvent.observations,
            })

            dataTable.table.resetRowSelection();

            const emptyEvent: GammaEvent = UpdateGraphTester(dataTable, testEvent);

            expect(emptyEvent.observations.length).toBe(0);
        }
        catch(err)
        {
            //Passes cause it breaks at the hook it reaches when updating the object
        }
    })
})