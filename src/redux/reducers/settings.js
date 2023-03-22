const INITIAL_STATE = {
  category: '',
  difficulty: '',
  type: '',
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET-CATEGORY':
    return {
      ...state,
      category: `&category=${action.payload}`,
    };
  case 'SET-DIFFICULTY':
    return {
      ...state,
      difficulty: `&difficulty=${action.payload}`,
    };
  case 'SET-TYPE':
    return {
      ...state,
      type: `&type=${action.payload}`,
    };
  default:
    return state;
  }
};

export default settings;
