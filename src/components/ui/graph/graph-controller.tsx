'use client'

import { GammaEvent, Observation } from "@/components/objects/event";
import { Button } from "../button";
import { DataTable, GetDataTable } from "./GraphTable";
import GraphVisual from "./graph-visual";
import { colleagueColumns, researcherColumns } from "@/components/ui/graph/columns";
import { useState } from "react";
import { Row } from "@tanstack/react-table";
import { FaGripLines, FaGripLinesVertical } from "react-icons/fa";
import { IoIosArrowDropdown, IoIosArrowDropdownCircle } from "react-icons/io";
import { layout } from "./visual-helpers";


//This function is used when testing, as it is identical to the production 'UpdateGraph' function but with passable props
export function UpdateGraphTester(dataTable: DataTable<Observation>, event: GammaEvent): GammaEvent {
    //Get the table from the dataTable object
    const table = dataTable.table;
    let selectedRows: Row<Observation>[] = table.getSelectedRowModel().rows;    //Get the array of selected rows
    let selectedObservations: Observation[] = [];   //define new observations as empty array

    //Loop through all rows and assign the observation to the new selectedObservations object
    selectedRows.forEach((row: Row<Observation>) => {
        let observation = row.original;
        selectedObservations.push(observation);
    })

    //Create a new event with the same details as the original but only the selected observations
    const newEvent: GammaEvent = {
        name: event.name,
        date: event.date,
        creator: event.creator,
        observations: selectedObservations,
    }

    return newEvent;
}

const GraphController = ({ event, userRole }: { event: GammaEvent, userRole: string | null }): React.JSX.Element => {

    const [displayEvent, setDisplayEvent] = useState<GammaEvent>(event);

    //Sorting the observations in the event
    event.observations.sort((a,b) => a.time.getTime() - b.time.getTime());

    let dataTable = GetDataTable({
        columns: userRole === 'researcher' ? researcherColumns : colleagueColumns,
        data: event.observations
    });    

    function UpdateGraph(): GammaEvent {
        //Get the table from the dataTable object
        const table = dataTable.table;
        let selectedRows: Row<Observation>[] = table.getSelectedRowModel().rows;    //Get the array of selected rows
        let selectedObservations: Observation[] = [];   //define new observations as empty array

        //Loop through all rows and assign the observation to the new selectedObservations object
        selectedRows.forEach((row: Row<Observation>) => {
            let observation = row.original;
            selectedObservations.push(observation);
        })

        //Create a new event with the same details as the original but only the selected observations
        const newEvent: GammaEvent = {
            name: event.name,
            date: event.date,
            creator: event.creator,
            observations: selectedObservations,
        }

        return newEvent;
    }


    const [showGraphs, setShowGraphs] = useState<boolean>(true);
    const [graphLayout, setGraphLayout] = useState<layout>('h');


    return (
        <>
            <div className='flex flex-row gap-8 mx-16 mb-3 p-3 border-2 justify-items-center border-gray-300 rounded-2xl border-solid bg-slate-50 w-fit'>
                <div
                    className={
                        graphLayout === 'v'
                            ?
                            'scale-90  transition-all self-center hover:bg-gray-200 rounded p-[2px]'
                            :
                            ' transition-all self-center bg-gray-200 rounded p-[2px]'
                    }
                    onClick={() => {
                        if (graphLayout !== 'h') {
                            setGraphLayout('h')
                        }
                    }}
                >
                    <FaGripLines size={30} />
                </div>
                <div
                    className={
                        graphLayout === 'h'
                            ?
                            'scale-90  transition-all self-center hover:bg-gray-200 rounded p-[2px]'
                            :
                            ' transition-all self-center bg-gray-200 rounded p-[2px]'

                    }
                    onClick={() => {
                        if (graphLayout !== 'v') {
                            setGraphLayout('v')
                        }
                    }}
                >
                    <FaGripLinesVertical size={30} />
                </div>
                <div
                    className={
                        !showGraphs
                            ?
                            'scale-90  transition-all self-center hover:bg-gray-200 rounded p-[2px]'
                            :
                            'transition-all self-center bg-gray-200 rounded p-[2px]'

                    }
                    onClick={() => {
                        setShowGraphs(!showGraphs);
                    }}
                >
                    {showGraphs ? (<IoIosArrowDropdownCircle size={30} />) : <IoIosArrowDropdown size={30} />}
                </div>
            </div>
            {showGraphs
                ?

                (<div>
                    <GraphVisual event={displayEvent} layout={graphLayout}></GraphVisual>
                    <div className="ml-6 mb-6 mt-6 px-4">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!dataTable.table.getIsSomeRowsSelected() && !dataTable.table.getIsAllRowsSelected()}
                            onClick={() => {
                                setDisplayEvent(displayEvent => UpdateGraph());
                            }
                            }
                        >
                            Update Visualisation
                        </Button>
                        {/* <Button
                            className="ml-6"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setDisplayEvent(displayEvent => {
                                    return {
                                        name: event.name,
                                        date: event.date,
                                        creator: event.creator,
                                        observations: [],   //empty because this button clears the visualisation
                                    }
                                })
                            }}
                        >
                            Clear Visualisation
                        </Button> */}
                    </div>

                </div>)
                :
                (<></>)
            }
            <div className="pb-10 px-10">
                {dataTable.element}
            </div>
        </>
    );
}

export default GraphController;