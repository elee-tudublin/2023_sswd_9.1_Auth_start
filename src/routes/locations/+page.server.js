/** @type {import('./$types').PageServerLoad} */

/** @return {Promise<Object>} */
export async function load( { fetch, params }) {
    
    let locations;
    let categories;


    try {
        // Call fetch
        const res_locations = await fetch('/api/locations');

        // if response code 200 (ok)
        if (res_locations.ok) {
            // get json from resonse
            locations = await res_locations.json();
        }

        const res_categories = await fetch('/api/categories');

        // if response code 200 (ok)
        if (res_categories.ok) {
            // get json from resonse
            categories = await res_categories.json();
        }

    } catch(error){
            // an error occured - return status code amd mesage
        return {
            error: error
        }
    }
    return {
        locations: locations.data,
        categories: categories.data
    }
}