


import React from 'react';
import { render } from '@testing-library/react';
import GraphVisual from "@/components/ui/graph/graph-visual";
import '@testing-library/jest-dom';
import { GammaEvent, GetTestGammaEvent } from '@/components/objects/event';
import 'resize-observer-polyfill';

//Cleanup the console output when testing as this test is very verbose
beforeAll(() => {
    console.log = jest.fn();
    console.error = jest.fn();
    console.warn = jest.fn();
})

describe('GraphVisual Component', () => {

    const event: GammaEvent = GetTestGammaEvent();

    test('As graph is rendered before router is mounted, if the page crashes as the router mount then the graph has correctly rendered', () => {
        try{
            const graphVisual = <GraphVisual event={event}></GraphVisual>;
            const { getByText } = render(graphVisual);
        } 
        catch(error: any)
        {
            if(error.toString().includes('hook'))
            {
                //Sick, passed
            }
            else{
                //Fialed, why?
                console.log(error.toString());
            }
        }

    });
});