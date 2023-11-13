// get the session from server-side and return it to the client-side
export const load = async ({ locals: { getSession } }) => {
    return {
      session: await getSession(),
    }
  }