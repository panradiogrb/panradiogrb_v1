/*********************************************************************************************************************************************************************************************
 * CREATE ENTRY SERVER COMPONENT
 * - This component retrieves a list of GRB events currently stored in the database to fill the 'event name' input field of the create form, and renders the CreateEntryForm client component
 *********************************************************************************************************************************************************************************************/

import CreateEntryForm from "@/components/forms/create/create-entry-form";
import { fetchGammaEvents } from "@/lib/data";

export default async function EntryFormPage() {
  // 1. Retrieve list of all events from database, to populate the event name field datalist within create entry form
  const events = await fetchGammaEvents();

  return (
    <CreateEntryForm events={events} />
  );
}