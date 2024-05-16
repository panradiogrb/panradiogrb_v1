'use client'

import { GammaEvent, Observation } from "@/components/objects/event";
import { Button } from "../button";
import { DataTable, GetDataTable } from "./GraphTable";
import GraphVisual from "./graph-visual";
import { colleagueColumns, researcherColumns } from "@/components/ui/graph/columns";
import { useState } from "react";
import { Row, RowModel } from "@tanstack/react-table";


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



    return (
        <>
            <GraphVisual event={displayEvent}></GraphVisual>

            <div className="m-6 px-4 w-full">
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
                <Button
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
                </Button>
            </div>

            <div className="pb-10 px-10">
                {dataTable.element}
            </div>
        </>
    );
}

export default GraphController;