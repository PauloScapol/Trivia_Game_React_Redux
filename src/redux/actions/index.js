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

export const setCategory = (category) => ({
  type: 'SET-CATEGORY',
  payload: category,
});

export const setDifficulty = (difficulty) => ({
  type: 'SET-DIFFICULTY',
  payload: difficulty,
});

export const setType = (type) => ({
  type: 'SET-TYPE',
  payload: type,
});
