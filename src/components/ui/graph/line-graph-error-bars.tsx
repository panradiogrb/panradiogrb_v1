'use client'

import Chart, { ChartConfiguration, ChartData, ChartOptions, Point } from "chart.js/auto";
import { use, useEffect, useMemo, useRef } from "react"
import 'chartjs-chart-error-bars'
import 'chart.js/auto';
import { LineWithErrorBarsChart } from 'chartjs-chart-error-bars';
import { Button } from "../button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { HiDotsHorizontal } from "react-icons/hi";



const LineChartErrorBars = ({ data, options, className, id, eventName }: { data: ChartData<"lineWithErrorBars", (number | Point | null)[], unknown>, options?: ChartOptions, id: string, className?: (string | undefined), eventName: string }): React.JSX.Element => {

    //Create the config from the given data & options

    const config: ChartConfiguration<'lineWithErrorBars'> = useMemo(() => {
        return {
            type: 'lineWithErrorBars',
            data: data,
            options: options,
        }
    }, [data])


    let ref = useRef<HTMLCanvasElement & { link: HTMLCanvasElement }>(null)

    useEffect(() => {
        //Destroy previous chart if it already exists so new one can be put on the canvas
        const existingChart = Chart.getChart(id);
        if (existingChart) {
            existingChart.destroy()
        }

        //Get the canvas for the chart
        let canvas = document!.getElementById(id) as HTMLCanvasElement; //Strong typing :OO b carful tommy
        let context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
        let lineChart = new LineWithErrorBarsChart(context, config);
        /*
            Just wanted to take a moment and explain the above for future Tom. Technically it could be written as follows:
                let context = document.getElementById('line').getContext('2d');
                let lineChart = new LineWithErrorBarsChart(context, config);

            The 'document!' line is saying that document will never be null.
            I chose to make it far more verbose to remove some annoying type errors. Because next.js won't have access
            to the 'document' value on server components, it's setup to show a warning that 'document' might be null
            if you try to access it directly. I didn't like the warning highlight cause it made me always think there is
            an error in my code when I look at it here.
            What I've effectively done is ask typescript to ignore the possibility that 'document' can be null. 
            The important thing to remember here is that I haven't removed the possibility that 'document' can be null
            (although it NEVER should be able to as this is within a useEffect hook, which runs after the component is
            rendered), I've just told typescript that it should never be null.
            If something breaks in the future, this is a possible place for why as it's kinda unsafe code. But it shouldn't.
            But just incase. >:)
            
            Does this count as rambling to myself? - tom
        */
    }, [config]); //Important that 'config' is passed here, otherwise the visualisation won't update when the configuration changes

    const downloadChart = () => {
        const link = document.createElement("a");
        link.download = eventName;
        link.href = ref?.current?.toDataURL("image/png")
        link.click()
    }

    return (
        // className added for tailwind compatability 
        <div className={className}>
            <canvas id={id} ref={ref}></canvas>
            {/* 
            <Button
                className="ml-6"
                size="sm"
                onClick={downloadChart}>
                Download
            </Button> */}
            <div className="absolute top-5 right-2 h-16 w-16 z-50">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <button className='hover:bg-gray-300 rounded p-1'>
                            <HiDotsHorizontal></HiDotsHorizontal>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className='bg-white p-1 rounded'>
                        <DropdownMenuItem
                            className="font-normal text-sm hover:cursor-pointer scale-95 hover:scale-100 transition-all hover:bg-gray-100 p-1 rounded"
                            onClick={downloadChart}
                        >
                            Download Graph Image
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>

        </div>
    );
}

export default LineChartErrorBars;