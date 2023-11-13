import { json, error } from '@sveltejs/kit';


export async function GET({ params, request, locals: { supabase, getSession } }) {

    if (params.id) {
        const id = parseInt(params.id)
        const locations = await supabase
        .from('locations')
        .select('*')
        .eq('id', id)
        .order('name', {ascending: true});

        if (locations.error) {
            return json({
                status: locations.status,
                error: locations.error
            });
        }

        return json({
            data: locations.data[0],
            status: locations.status
        });

    }
    return json({
        status: 400,
        error: 'Bad Request'
    });
}