import { combineReducers } from 'redux';
import compList from './compList';
import compEditor from './compEditor';

const rootReducer = combineReducers({
    compList,
    compEditor
});

export default rootReducer;
