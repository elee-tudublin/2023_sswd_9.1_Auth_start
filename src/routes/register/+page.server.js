
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate, message } from 'sveltekit-superforms/server';

// Supervalidate schema for the registration form
const schema = z.object({
  email: z.string(),
  password: z.string()
});

// Page load
// Build the form and returns to page
export async function load({ fetch, params }) {
  // Build form
  const form = await superValidate(schema);

  // Return form
  return {
      form
  };
}

// Form actions (e.g. what to do when submit happens)
export const actions = {
  // default form submit
  default: async ({ request, url, locals: { supabase } }) => {
      // retrieve form data and validate
      const form = await superValidate(request, schema);
      //console.log('POST', form);

      if (!form.valid) {
          return fail(400, { form });
      }
      // read the form data
      const email = form.data.email;
      const password = form.data.password;

      // call the supabase api to create a new account
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // redirect and pass id to client side
          emailRedirectTo: `${url.origin}/api/auth/callback`,
        },
      })
  
      if (error) {
        return fail(500, { message: 'Server error. Try again later.', success: false, email })
      }
  
      // return form and message
      return message(form, `success: Please check your email for a verification link.`);
  }
};
