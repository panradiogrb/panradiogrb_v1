import { GammaEvent, Observation } from "@/components/objects/event";
import { ChartData, Point, ChartDataset, ChartOptions, ScriptableLineSegmentContext } from "chart.js/auto";
import { PointWithErrorBar } from "chartjs-chart-error-bars";
import { max } from "date-fns";

/*
    visual-helpers.ts
    --------
    This file holders helper functions called by the graph visual components.
*/

/*
    GetLineGraphData
    -------
    Organises the event object such that it holds the information. <-- Yet, I wrote this. No, I don't really know what it means - Tom
*/
export function GetLineGraphData(event: GammaEvent): ChartData<"lineWithErrorBars", (number | Point | null)[], unknown> {

    //Create the data object that will hold the information for the graph
    let allData: ChartData<"lineWithErrorBars", (number | Point | null)[], unknown> = {
        datasets: []
    };

    /*  The data to be presented is from the observation objects within the event object.
        It is displayed based on frequency, with each frequency having the same colour on the graph
        & a line connecting them.
        The difference between points of the same frequency must be the time that they are measured.
        This function needs to gather all the observations of the same frequency and ensure they're
        in the correct dataset so as to make them appear together.
        
        Possible tests:
            - Only getting one of each frequency in the checked bands array
            - Every observation is accounted for in the resulting lists

        Currently this function is a mess of multiple high-level functions occuring within the one. Probably need to seperate it from this god function lol
    */

    //This is a list of lists of observations, which will be ordered so that each list contains all observations of the same freqency
    let freqBands: Observation[][] = [];

    //This is an array of numbers storing the already checked frequencies 
    let checkedBands: number[] = [];

    //Shorthanding the observation array from the event for easier use
    let observations = event.observations;

    //Loop through all observations and sort them into groups based on frequency
    for (let i: number = 0; i < event.observations.length; i++) {
        //Check the next observation's frequency
        let currentBand = observations[i].frequency;

        //If the freqency dataset hasn't been listified yet, do so
        if (!checkedBands.includes(currentBand)) {
            //Construct list of observations at that freqnecy
            let currentFreqList: Observation[] = [];

            //Loop through observations
            for (let k: number = 0; k < event.observations.length; k++) {
                //If the current observation is the same freqnecy...
                if (observations[k].frequency == currentBand) {
                    //Add it to the list!
                    currentFreqList.push(
                        observations[k]
                    );
                }
            }

            //Add this frequency to checked bands
            checkedBands.push(currentBand);

            //Push this list onto the list of lists of observations
            freqBands.push(currentFreqList);
        }
    }

    //Construct datasets based on this information

    let data: (number | Point | null)[] = [];
    let sets: ChartDataset<"lineWithErrorBars", (number | Point | null)[]>[] = [];

    //Loop through all the freqBands lists
    for (let i = 0; i < freqBands.length; i++) {
        //Loop through the current list
        for (let k = 0; k < freqBands[i].length; k++) {
            //Calculate the time from the original event
            let time: number = event.date.getTime();
            //x will be the difference between the 2 events, converted to hours. Converted by dividing milliseconds by 3.6 mil
            let x: number = (freqBands[i][k].time.getTime() - time) / 3600000 / 24; // days
            let y: number = freqBands[i][k].flux;                                   // flux reading
            let yMin: number = freqBands[i][k].flux - freqBands[i][k].fluxError;    // minimum flux
            if (yMin <= 0) { yMin = 0 } //prevent min being less than 0 so error bars display properly
            let yMax: number = freqBands[i][k].flux + freqBands[i][k].fluxError;

            //Assign the values
            let t: (number | Point | null) = {
                x: x,
                y: y,
                yMin: yMin,
                yMax: yMax,
            };
            data.push(t);   //Put the new point object onto the data object
        }

        const skipped = (ctx: ScriptableLineSegmentContext, value: number[]) => ctx.p0.skip || ctx.p1.skip ? value : undefined;

        //Push the new data input
        sets.push({
            label: (freqBands[i][0].frequency.toString() + "GHz"),
            data: data,
            segment: {
                borderDash: ctx => skipped(ctx, [4, 4]),
            }
        });

        //Reset the data object
        data = [];
    }

    //Sort the sets based on frequency
    sets.sort((a, b) => {
        const xA = parseInt(a.label as string); //freq is essential so it must always be in the observation object
        const xB = parseInt(b.label as string);

        return xA - xB;
    });

    //Sort the datasets within the sets based on X value (so earlier events appear first when connecting lines on graph)
    sets.forEach((data) => {
        data.data.sort((a, b) => {
            return a.x - b.x;
        })
    })

    //Actually apply the datasets to the graph info
    allData = {
        datasets: sets,
    };

    /* data structure for reference
    data = {
        datasets: [
            {
                label: '3ghz',
                data: [
                    {
                        x: event.observations[0].flux, 
                        y: 10,
                        yMin: [1, 2],   //this is still not finished, need to work out how to implement with chartjs-react-2
                        yMax: [1, 2],
                    },
                    {
                        x: 12.3, 
                        y: 14.5,
                        yMin: [1, 2],
                        yMax: [1, 2],
                    }
                ],
            },
            {
                label: '6ghz',
                data: [
                    {x: event.observations[1].flux, y: 15}, 
                    {x: 10, y: 11.3}
                ],
            }
        ]
    }
    */
    return allData;
}

export function GetLineGraphOptions(event: GammaEvent, showLine: boolean, showErrorBars: boolean): ChartOptions {
    const options: ChartOptions<'lineWithErrorBars'> = {
        plugins: {
            title: {
                display: true,
                text: event.name + " - Flux Readings Over Time",
            },
            legend: {
                position: "bottom",
            },
            colors: {
                forceOverride: true,
            },
            // zoom: {
            //     pan: {
            //         enabled: true,
            //         modifierKey: 'ctrl',
            //     },
            //     zoom: {
            //         drag: {
            //             enabled: true
            //         },
            //         mode: 'xy',
            //     },
            // },
        },
        datasets: {
            lineWithErrorBars: {
                errorBarLineWidth: 0.5,
                errorBarWhiskerLineWidth: 0.5,
                //this is where styling for the error whiskers can go
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        showLine: showLine,
        spanGaps: true,
        scales:
        {
            y: {
                title: {
                    display: true,
                    text: "Flux Density (µJy)",
                },
                ticks: {
                    //Quote correct units in ticks
                    callback: function (value, index, ticks) {
                        if (value.toString().split('.')[0] !== value.toString()) {
                            return '';
                        }
                        if (typeof value === 'number' && Math.log10(Math.round(value)) % 1 === 0) {
                            return value;
                        }

                        if (typeof value === 'string' && Math.log10(Math.round(parseInt(value))) % 1 === 0) {
                            return value;
                        }

                        return;
                    }
                },
                type: 'logarithmic' as const,
                display: true,
                min: 0,
                grid: {
                    color: "rgba(0, 0, 0, 0)",
                },
            },
            x: {
                ticks: {
                    //Quote correct units in ticks
                    callback: function (value, index, ticks) {
                        if (value.toString().split('.')[0] !== value.toString()) {
                            return '';
                        }
                        if (typeof value === 'number' && Math.log10(Math.round(value)) % 1 === 0) {
                            return value;
                        }

                        if (typeof value === 'string' && Math.log10(Math.round(parseInt(value))) % 1 === 0) {
                            return value;
                        }

                        return '';
                    }
                },
                title: {
                    display: true,
                    text: "Time After Discovery (days)",
                },
                type: 'logarithmic' as const,
                display: true,
                min: 0,
                grid: {
                    color: "rgba(0, 0, 0, 0)",
                },
            },
        }
    }

    return options;
}


/*
    GetFluxFreqGraphData
    ------
    Convert the GammaEvent object passed to this function into ChartData for the lineWithErorBars chart that displays the info for the Flux/Freq graph.

    THIS FUNCTION ASSUMES ALL THE OBSERVATIONS IN THE GAMMAEVENT OBJECT ARE FROM THE SAME DAY. Cause they should be if youre calling this.
*/
export function GetFluxFreqGraphData(event: GammaEvent): ChartData<"lineWithErrorBars", (number | Point | null)[], unknown> {

    //Plot the observations with Flux Density on the Y axis, and Frequency on the X axis

    //Create the ChartData object
    let allData: ChartData<"lineWithErrorBars", (number | Point | null)[], unknown> = {
        datasets: []
    };

    const observations = event.observations;

    let timeEpochs: Observation[][] = [];
    let dataSets: ChartDataset<"lineWithErrorBars", (number | Point | null)[]>[] = [];

    //Store all the observations in an array of subarrays grouped by if they overlap
    //Check if they overlap by first seeing if they are on the first day, and then if not then run the 'IsOverlapping' command.
    for (let i: number = 0; i < event.observations.length; i++) {
        //Check the next observation's time

        //wasAdded checks to see if it actually gets added to a list
        let wasAdded: boolean = false;

        //Check if the current start or end time is already in an epoch
        timeEpochs.forEach((observationsList) => {
            //Check if the first element has any overlap with the current observation being checked
            // if (DateToString(observationsList[0].time) === currentStartTime || DateToString(observationsList[0].time) === currentEndTime || DateToString(observationsList[0].endTime) === currentStartTime || DateToString(observationsList[0].endTime) === currentEndTime){
            if (IsOverlapping(observationsList[0], observations[i])) {
                //it does, add it to the current list
                observationsList.push(observations[i]); //fuck why am i using forEach and regular for loops ;-; old code meet new code i guess lol
                wasAdded = true;    //update was added so it doesn't create a duplicate epoch list
            }
        })

        //At this point, the observation wasn't in any list already so it must be added as the only entry in a new list
        if (!wasAdded) {
            timeEpochs.push([observations[i]])
        }

    }


    timeEpochs.sort((a, b) => a[0].time.getTime() - b[0].time.getTime());


    //Loop through all the epochs and construct datasets with their values
    timeEpochs.forEach((observationsList) => {
        let data: Point[] = [];
        observationsList.forEach((observation) => {
            //Calculate the x, y, yMin & yMax values for the current data
            const x: number = observation.frequency;
            const y: number = observation.flux;
            const yMin: number = observation.flux - observation.fluxError < 0 ? 0 : observation.flux - observation.fluxError;
            const yMax: number = observation.flux + observation.fluxError;

            //Construct a point with the calculated data
            let t: PointWithErrorBar = {
                x: x,
                y: y,
                yMax: yMax,
                yMin: yMin,
            }

            //Put that calculated data onto the data array
            data.push(t);
        })

        //At this point, all the observations for this day have been gone through. I need to construct the label for the set & pass it to the datasets array
        if (observationsList.length > 0) {
            dataSets.push({
                label: "Epoch: " + DateToString(observationsList[0].time),
                data: data,
            });
        }

        //Reset the data object (unecessary in this code as I declare it in the for loop but just incase I use it again)
        data = [];
    })

    allData.datasets = dataSets;

    //Sort the datasets within the sets based on X value (so earlier events appear first when connecting lines on graph)
    //This is done on the other graph too and should be its own function but is not because :D 
    allData.datasets.forEach((data) => {
        data.data.sort((a, b) => {
            return a.x - b.x;
        })
    })

    return allData;
}

/*
    GetFluxFreqGraphOptions
    ------
    The options for the Flux/Freq graph.

    Display the titles for the axis (x - Frequency (GHz), y - Flux Density (µJy)).
    Get the proper scale (logarithmic).
    Set the colours as needed.
*/
export function GetFluxFreqGraphOptions(event: GammaEvent): ChartOptions {
    const options: ChartOptions = {
        plugins: {
            title: {
                display: true,
                text: event.name + " - Flux Readings compared to Frequency on " + DateToString(event.observations[0].time),
            },
            legend: {
                position: "bottom",
                display: true,
            },
            colors: {
                forceOverride: true,
            },
            // zoom: {
            //     pan: {
            //         enabled: true,
            //         modifierKey: 'ctrl',
            //     },
            //     zoom: {
            //         drag: {
            //             enabled: true
            //         },
            //         mode: 'xy',
            //     },
            // },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales:
        {
            y: {
                title: {
                    display: true,
                    text: "Flux Density (µJy)",
                },
                ticks: {
                    //Quote correct units in ticks
                    callback: function (value, index, ticks) {
                        if (value.toString().split('.')[0] !== value.toString()) {
                            return '';
                        }
                        if (typeof value === 'number' && Math.log10(Math.round(value)) % 1 === 0) {
                            return value;
                        }

                        if (typeof value === 'string' && Math.log10(Math.round(parseInt(value))) % 1 === 0) {
                            return value;
                        }

                        return;
                    }
                },
                type: 'logarithmic',
                display: true,
                min: 0,
                grid: {
                    color: "rgba(0, 0, 0, 0)",
                },
            },
            x: {
                ticks: {
                    //Quote correct units in ticks
                    callback: function (value, index, ticks) {
                        return value;
                    }
                },
                title: {
                    display: true,
                    text: "Frequency (GHz)",
                },
                type: 'logarithmic',
                display: true,
                // min: 4,
                grid: {
                    color: "rgba(0, 0, 0, 0)",
                },
            },
        },
    }

    return options;
}

/*
    ObservationsSameDate
    ------
    Are all the observations provided from the same date?
*/
export function ObservationsSameDate(obs: Observation[]): boolean {
    let sameDate = true;

    //If the array is empty, return early with false
    if (obs.length <= 1) {
        return false;
    }

    //At this point, the array has at least 1 observation
    let firstDate: string = DateToString(obs[0].time);  //convert to string representation of date for easier comparing between dif times of same date

    //Check that there is a first date
    // if (typeof firstDate !== 'number') {
    //     console.log("observation list is empty. This can happen. It's allowed")
    // }
    //comented the above cause idk why its running all the time?



    //Check if all the dates in the array are the same
    obs.forEach((observation) => {
        if (DateToString(observation.time) !== firstDate) {
            sameDate = false;   //its different, sameDate is false
        }
    })

    //DEBUG
    console.log('sameDate: ', sameDate);


    return sameDate;
}

/*
    DateToString
    -------
    Convert the given Date object to a string
*/
export function DateToString(date: Date): string {
    const day: string = date.getDate().toLocaleString('en-us', { minimumIntegerDigits: 2, useGrouping: false });
    const month: string = (date.getMonth() + 1).toLocaleString('en-us', { minimumIntegerDigits: 2, useGrouping: false });
    const year: string = date.getFullYear().toLocaleString('en-us', { minimumIntegerDigits: 2, useGrouping: false });

    const dateString: string = day + "/" + month + "/" + year;

    return dateString;
}

/*
    IsOverlapping
    -------
    This function returns true if the 2 given Observations are overlapping in terms of date, and false if not.
*/
export function IsOverlapping(one: Observation, two: Observation): boolean {
    let isOverlaping = false;

    //surely best way to check is get the start time of obs two and see if it is >= to one's start time & <= to one's end
    //then check if the same but reverse one & two

    const oneStart: number = one.time.getTime();
    const twoStart: number = two.time.getTime();
    const oneEnd: number = one.endTime.getTime();
    const twoEnd: number = two.endTime.getTime();

    if (twoStart >= oneStart && twoStart <= oneEnd) {
        isOverlaping = true;
    }

    if (oneStart >= twoStart && oneStart <= twoEnd) {
        isOverlaping = true;
    }





    // check if dates overlap
    // they overlap if one of their start times is during the overall period of the other
    // if (two start time - one start time < one end time - one start time) = if(how long after one did two start < how long did one run for)
    // //check if two occured during one
    // if (two.time.getTime() - one.time.getTime() < one.endTime.getTime() - one.time.getTime()) {
    //     isOverlaping = true;
    // }

    // //check if one occured during two
    // if (one.time.getTime() - two.time.getTime() < two.endTime.getTime() - two.time.getTime()) {
    //     isOverlaping = true;
    // }

    //something unpleasant is going on above as it always assumes to be true

    return isOverlaping;
}


//This type is used for assigning the layout to the graph visuals. h for horizontal and v for vertical
export type layout = ('v' | 'h');