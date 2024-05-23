'use client'

import Chart, { ChartConfiguration, ChartData, ChartDataset, ChartOptions, Point } from "chart.js/auto";
import { use, useEffect, useMemo, useRef, useState } from "react"
import 'chartjs-chart-error-bars'
import 'chart.js/auto';
import { LineWithErrorBarsChart } from 'chartjs-chart-error-bars';
import { Button } from "../button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { HiDotsHorizontal } from "react-icons/hi";
import zoomPlugin from 'chartjs-plugin-zoom';

function getMinXGraphValue(data: ChartDataset<"lineWithErrorBars", (number | Point | null)[]>[]): number
{
    let minVal = -1;   //this function wont work if 

    data.forEach((data) => {
        data.data.forEach((point) => {
            //I know that all the data will be of type 'Point' so I can access the x & y values
            if(minVal === -1){minVal = point.x}
            else if(point.x < minVal && point.x !== 0){
                minVal = point.x;
            }
        })
    });

    console.log('minVal x: ', minVal);

    return minVal;
}

function getMinYGraphValue(data: ChartDataset<"lineWithErrorBars", (number | Point | null)[]>[]): number
{
    let minVal = -1;   //this function wont work if 

    data.forEach((data) => {
        data.data.forEach((point) => {
            //I know that all the data will be of type 'Point' so I can access the x & y values
            if(minVal === -1){minVal = point.y}
            else if(point.y < minVal && point.y !== 0){
                minVal = point.y;
            }
        })
    });

    console.log('minVal y: ', minVal);

    return minVal;
}

const LineChartErrorBars = ({ data, options, className, id, eventName }: { data: ChartData<"lineWithErrorBars", (number | Point | null)[], unknown>, options: ChartOptions<'lineWithErrorBars'>, id: string, className?: (string | undefined), eventName: string }): React.JSX.Element => {

    //Create the config from the given data & options
    const [showLine, setShowLine] = useState<boolean>(true);
    const [showErrorBars, setShowErrorBars] = useState<boolean>(true);
    Chart.register(zoomPlugin);


    const config: ChartConfiguration<'lineWithErrorBars'> = useMemo(() => {

        //Check showline
        if (showLine) {
            options.showLine = true;
        }
        else {
            options.showLine = false;
        }

        //Check showErrorBars
        if (showErrorBars) {
            // options.datasets.lineWithErrorBars?.errorBarLineWidth = 0.5;
            options = {
                ...options,
                datasets: {
                    lineWithErrorBars: {
                        errorBarLineWidth: 0.5,
                        errorBarWhiskerLineWidth: 0.5,
                        //this is where styling for the error whiskers can go
                    }
                }
            }
        }
        else {
            options = {
                ...options,
                datasets: {
                    lineWithErrorBars: {
                        errorBarLineWidth: 0.001,
                        errorBarWhiskerLineWidth: 0.001,
                        //this is where styling for the error whiskers can go
                    }
                }
            }
        }

        const minYVal = getMinYGraphValue(data.datasets);

        //Set the options' min & max values based on the passsed data
        options = {
            ...options,
            scales: {
                ...options.scales,
                x: {
                    ...options.scales.x,
                    min: Math.round(getMinXGraphValue(data.datasets) - 1),
                },
                y: {
                    ...options.scales.y,
                    min: minYVal - (minYVal / 2),
                }
            }
        }

        return {
            type: 'lineWithErrorBars',
            data: data,
            options: options,
        }
    }, [data, showLine, showErrorBars]);


    const [resetZoom, setResetZoom] = useState<boolean>(false);
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
        lineChart.resetZoom();

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

            coming back later, a simpler check is just that 'if (document is not null){do function}
        */
    }, [config, resetZoom]); //Important that 'config' is passed here, otherwise the visualisation won't update when the configuration changes

    const downloadChart = () => {

        const link = document.createElement("a");
        let canvas = ref?.current!
        let context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.save()
        
        context.globalCompositeOperation = "destination-over"
        context.fillStyle = "white"
        context.fillRect(0, 0, canvas.width, canvas.height)
        var image = canvas.toDataURL("image/png")
        link.download = eventName;
        link.setAttribute('href', image)
        //link.href = ref?.current?.toDataURL("image/png")
        context.restore()


        link.click()
    }

    return (
        // className added for tailwind compatability 
        <div className={className}>
            <canvas id={id} ref={ref}></canvas>
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
                        <DropdownMenuItem
                            className="font-normal text-sm hover:cursor-pointer scale-95 hover:scale-100 transition-all hover:bg-gray-100 p-1 rounded"
                            onClick={() => {
                                if (showLine === true) {
                                    setShowLine(false);
                                }
                                else {
                                    setShowLine(true);
                                }
                            }}
                        >
                            Toggle Lines
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="font-normal text-sm hover:cursor-pointer scale-95 hover:scale-100 transition-all hover:bg-gray-100 p-1 rounded"
                            onClick={() => {
                                setShowErrorBars(!showErrorBars);
                            }}
                        >
                            Toggle Error Bars
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>

        </div>
    );
}

export default LineChartErrorBars;