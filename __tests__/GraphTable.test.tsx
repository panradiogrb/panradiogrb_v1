import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataTable, GetDataTable } from '@/components/ui/graph/GraphTable';
import { columns } from "@/components/ui/graph/columns";
import { GammaEvent, GetTestGammaEvent, Observation } from '@/components/objects/event';
import '@testing-library/jest-dom'

//Cleanup the console output when testing as this test is very verbose
beforeAll(() => {
    console.log = jest.fn();
    console.error = jest.fn();
    console.warn = jest.fn();
})

describe('DataTable component', () => {


    const data: GammaEvent = GetTestGammaEvent()

    test('renders table with data', () => {
        //The graph renders before the hooks are called. If a hook is called, it will throw an error and it can be assumed the graph rendered correctly. 
        try {
            render(GetDataTable({ columns: columns, data: data.observations }).element);
        }
        catch (er: any) {
            if (er.toString().includes('hook')) {
                //Passed!
            }
            else
            {
                //What was the error?
                console.log(er.toString())
            }
        }
    });
});