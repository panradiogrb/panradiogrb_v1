import { EntryFormErrors, validationErrors } from "@/components/objects/event";

export const FormatErrors = (errorFormErrorState: EntryFormErrors, addForm: boolean): React.JSX.Element[] => {
    let errorElement: React.JSX.Element[] = [];
    let curSubform = 0;
    let started = false;    //this is messy pls ignore its final sprint guys

    console.log(errorFormErrorState);

    errorFormErrorState.subformErrors.forEach((error, index) => {


        if (error.subformId == 0) {
            //****************** */
            // EVENT NAME ERROR
            //****************** */
            errorElement.push(
                <div key={index} className='pt-2'>
                    <p><strong>Event Name:</strong> {error.message}</p>
                </div>
            );
        }
        else {
            if (curSubform !== error.subformId && addForm) {
                curSubform = error.subformId;

                //**************** */
                // SUBFORM ERROR    -   FIRST ENTRY
                //**************** */
                errorElement.push(
                    <div key={index} className='pt-2'>
                        <p><strong>Observation {error.subformId}</strong></p>
                        <p><span className='font-semibold'>{error.field}:</span> {error.message}</p>
                    </div>
                );
            }
            else {
                errorElement.push(
                    <div key={index}>
                        <p><span className='font-semibold'>{error.field}:</span> {error.message}</p>
                    </div>
                );
            }
        }
    })

    return errorElement;
}
