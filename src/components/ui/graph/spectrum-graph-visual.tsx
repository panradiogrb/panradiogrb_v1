'use client'

import { GammaEvent } from "@/components/objects/event";
import LineChartErrorBars from "./line-graph-error-bars";
import { GetFluxFreqGraphData, GetFluxFreqGraphOptions, ObservationsSameDate } from "./visual-helpers";
import React, { useMemo } from "react";

const SpectrumChart = ({ event, className }: { event: GammaEvent, className?: string | undefined }): React.JSX.Element => {

    //Check that all selected observations have the same date This is memo-ized so that it doesn't keep re-fetching the check when it doesn't need to, only when the event itself is updadted.
    /*const checked: boolean = useMemo(() => {
        return ObservationsSameDate(event.observations);
    }, [event]);
    const chartData = useMemo(() => {
        return GetFluxFreqGraphData(event);         //These are all memo-ised so that they dont cause reloads whenever the user interacts with the page
    }, [event]);
    const chartOptions = useMemo(() => {
        try {
            return GetFluxFreqGraphOptions(event);
        }
        catch (e: any) {
            console.log("Didn't get the event name. This is likely cause the gamma event was just cleared and the chart hasn't had a chance to delete itself yet");   //DEBUG
            return {};
        }
    }, [event]);*/

    //old code is above, redo if necessary

    const chartData = useMemo(() => {
        return GetFluxFreqGraphData(event);
    }, [event]);

    const chartOptions = useMemo(() => {
        try {
            return GetFluxFreqGraphOptions(event);
        }
        catch (e: any) {
            console.log("Didn't get the event name. This is likely cause the gamma event was just cleared and the chart hasn't had a chance to delete itself yet");   //DEBUG
            return {};
        }
    }, [event])




    const element = (
        <div className={className}>
            <LineChartErrorBars eventName={event.name + "_Spectrum-Graph"} id='spectrum' data={chartData} options={chartOptions} className='w-full h-full'></LineChartErrorBars>
        </div>
    );

    return element;
}

export default SpectrumChart;