import { combineReducers } from 'redux';
import compView from './compView';
import welcome from './welcome';

const rootReducer = combineReducers({
    compView,
    welcome
});

export default rootReducer;
