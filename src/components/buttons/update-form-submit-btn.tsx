import React from 'react'
import { Button } from "@/components/ui/button";
import { useFormStatus } from 'react-dom';

export const EditSubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            className="text-white drop-shadow-xl bg-blue-600 w-40 disabled:scale-100 disabled:bg-opacity-65"
            aria-disabled={pending}
            disabled={pending}>
            {pending ? <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div> : 'Update'}
        </Button>
    )
}
