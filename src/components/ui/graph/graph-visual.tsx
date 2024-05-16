'use client'

import 'chart.js/auto';
import React, { useMemo } from 'react';
import { GammaEvent } from "../../objects/event";
import LineChartErrorBars from './line-graph-error-bars';
import SpectrumChart from './spectrum-graph-visual';
import { GetLineGraphData, GetLineGraphOptions } from './visual-helpers';

//GraphVisual   -   React.JSX.Element
//  -------------------
//Graph visual is a component that will display the contents of an event object passed to it in a visual graph.
//It is not a constant so that it can be updated with a new event if the user would like to cut specific observations out from being viewed.


const GraphVisual = ({ event }: { event: GammaEvent }): React.JSX.Element => {
    const data = useMemo(() => {
        return GetLineGraphData(event);
    }, [event])

    const lOptions = useMemo(() => {
        return GetLineGraphOptions(event);
    }, [event]);

    return (
        <div className="px-6 w-full h-full flex flex-row flex-1 justify-evenly">
            <div className="flex-1 px-2 h-72 sm:h-96">
                <LineChartErrorBars eventName={event.name + "_Light-Graph"} data={data} options={lOptions} id='firstchart' className="p-4 max-w-full w-full h-full flex-1 drop-shadow-md rounded-2xl bg-slate-50 border-solid border-gray-300 border-2 text-center self-center"></LineChartErrorBars>
            </div>
            <div className="flex-1 px-2 h-72 sm:h-96 <--(this shouldnt be hardcoded but it is for now cause it works)">
                <SpectrumChart className="p-4 max-w-full w-full h-full flex-1 drop-shadow-md rounded-2xl bg-slate-50 border-solid border-gray-300 border-2 text-center self-center" event={event}></SpectrumChart>
                
            </div>
        </div >
    );
}

export default GraphVisual; 