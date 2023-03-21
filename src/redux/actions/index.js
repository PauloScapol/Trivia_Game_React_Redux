export const loginForm = (name, email) => ({
  type: 'LOGIN-EMAIL',
  payload: { email,
    name },
});

export const setScore = (score) => (
  {
    type: 'SCORE',
    payload: score,
  }
);

export const setAcertos = () => ({
  type: 'ACERTOS',
});

export const setResetPlayer = () => ({
  type: 'RESET-PLAYER',
});
