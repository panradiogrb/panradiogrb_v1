import { mockSignIn } from '../__mocks__/supabaseClient'

describe('Supabase Authentication', () => {
  beforeEach(() => {
    mockSignIn.mockReset();
  });

  it('should respond with an auth token on successful login', async () => {
    // Mock a successful login response
    mockSignIn.mockResolvedValue({data: {session: {access_token: 'mockToken'}}, error: null});

    // Simulate a login attempt
    const response = await mockSignIn({email: 'test@example.com', password: '12345'});
    
    expect(response.data.session.access_token).toBe('mockToken');
    expect(response.error).toBeNull();
  });

  it('should respond with an error on failed login', async () => {
    // Mock a failed login response
    mockSignIn.mockResolvedValue({data: null, error: {message: 'Invalid login credentials'}});

    // Simulate a failed login attempt
    const response = await mockSignIn({email: 'wrong@example.com', password: 'wrongPassword'});

    expect(response.data).toBeNull();
    expect(response.error.message).toBe('Invalid login credentials');
  });
});