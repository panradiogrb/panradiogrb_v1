export const mockSignIn = jest.fn();

const supabaseClient = {
  auth: {
    signIn: mockSignIn,
  },
};

export default supabaseClient;