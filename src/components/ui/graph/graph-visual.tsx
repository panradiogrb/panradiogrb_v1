'use client'

import 'chart.js/auto';
import React, { useEffect, useMemo, useState } from 'react';
import { GammaEvent } from "../../objects/event";
import LineChartErrorBars from './line-graph-error-bars';
import SpectrumChart from './spectrum-graph-visual';
import { GetLineGraphData, GetLineGraphOptions, layout } from './visual-helpers';



//GraphVisual   -   React.JSX.Element
//  -------------------
//Graph visual is a component that will display the contents of an event object passed to it in a visual graph.
//It is not a constant so that it can be updated with a new event if the user would like to cut specific observations out from being viewed.


const GraphVisual = ({ event, layout }: { event: GammaEvent, layout: layout }): React.JSX.Element => {
    const data = useMemo(() => {
        return GetLineGraphData(event);
    }, [event])

    const lOptions = useMemo(() => {
        return GetLineGraphOptions(event, true);
    }, [event]);


    return (
        <>
            <div className={
                layout === 'h'
                    ?
                    "w-full h-full flex flex-col flex-1 justify-evenly"
                    :
                    "w-full h-full flex flex-row flex-1 justify-evenly"
            }>
                <div className="p-6 aspect-video">
                    <LineChartErrorBars
                        eventName={event.name + "_Light-Graph"}
                        data={data}
                        options={lOptions}
                        id='firstchart'
                        className={
                            layout === 'h'
                                ?
                                "p-4 max-w-full w-full h-full flex-1 drop-shadow-md rounded-2xl bg-slate-50 border-solid border-gray-300 border-2 text-center self-center"
                                :
                                "p-4 h-[400px] w-[600px] flex-1 drop-shadow-md rounded-2xl bg-slate-50 border-solid border-gray-300 border-2 text-center self-center"
                        }>
                    </LineChartErrorBars>
                </div>
                <div className="p-6 aspect-video">
                    <SpectrumChart
                        className={
                            layout === 'h'
                                ?
                                "p-4 max-w-full w-full h-full flex-1 drop-shadow-md rounded-2xl bg-slate-50 border-solid border-gray-300 border-2 text-center self-center"
                                :
                                "p-4 h-[400px] w-[600px] flex-1 drop-shadow-md rounded-2xl bg-slate-50 border-solid border-gray-300 border-2 text-center self-center"
                        }
                        event={event}>
                    </SpectrumChart>
                </div>
            </div >
        </>
    );
}

export default GraphVisual; 