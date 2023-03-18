const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: '',
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
      score: action.payload,
    };
  default:
    return state;
  }
};

export default player;
