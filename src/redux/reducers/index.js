import { combineReducers } from 'redux';
import player from './player';
import settings from './settings';

export default combineReducers({
  player,
  settings,
});
