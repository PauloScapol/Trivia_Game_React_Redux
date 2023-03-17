export const loginForm = (name, email) => ({
  type: 'LOGIN-EMAIL',
  payload: { email,
    name },
});
