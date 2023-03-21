const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN-EMAIL':
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case 'SCORE':
    console.log(action.payload);
    return {
      ...state,
      score: state.score + action.payload,
    };
  case 'ACERTOS':
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  case 'RESET-PLAYER':
    return {
      ...state,
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
  default:
    return state;
  }
};

export default player;
