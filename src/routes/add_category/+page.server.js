// https://superforms.rocks/get-started
// 1. npm i -D sveltekit-superforms zod

// import dependencies
// Zod: validator
// superforms: form helper
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate, message } from 'sveltekit-superforms/server';

// Define the form schema and validation requirments
// this is a basic example
const schema = z.object({
    id: z.number().optional(),
    name: z.string(),
    description: z.string()
});

// Page load
// Build the form and returns to page
export async function load({ fetch, params }) {
    // Build form
    const form = await superValidate(schema);

    // Return form and categories
    return {
        form
    };
}

// Form actions (e.g. what to do when submit happens)
export const actions = {
    // default form submit
    default: async ({ request, fetch }) => {
        // retrieve form data and validate
        const form = await superValidate(request, schema);
        //console.log('POST', form);

        if (!form.valid) {
            return fail(400, { form });
        }

        // Add the new location via n API call
        // note POST
        const response = await fetch('/api/categories', {
            method: 'POST',
            body: JSON.stringify(form.data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const new_cat  = await response.json();

        console.log('new cat:', new_cat);

        // if insert returned a new location, add its id to the form for display
        if (new_cat.data)
        {
            form.data.id = new_cat.data.id;
        }
        // return form and message
        return message(form, `success: new category added`);
    }
};