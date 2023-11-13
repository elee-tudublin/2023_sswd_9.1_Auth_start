import { json, error } from '@sveltejs/kit';


export async function GET({ request, locals: { supabase, getSession }  }) {

    const categories = await supabase
    .from('location_category')
    .select('*')
    .order('name', {ascending: true});

    if (categories.error) {
        return json({
            status: categories.status,
            error: categories.error
        });
    }

    return json({
        data: categories.data,
        status: categories.status
    });
}

// Add a new category
export async function POST({ request, locals: { supabase, getSession }  }) {
    let data = await request.json();

    const new_cat = await supabase
    .from('location_category')
    .insert([data])
    .select()

    if (new_cat.error) {
        return json({
            status: new_cat.status,
            error: new_cat.error
        });
    }

    // return first item in the array
    return json({
        data: new_cat.data[0]
    });
}