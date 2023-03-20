export const loginForm = (name, email) => ({
  type: 'LOGIN-EMAIL',
  payload: { email,
    name },
});

export const setScore = (score) => {
  console.log(score);
  return (
    {
      type: 'SCORE',
      payload: score,
    }
  );
};
