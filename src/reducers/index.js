import {combineReducers} from 'redux';
import chatReducer from "./chatReducer";
import editorReducer from "./editorReducer";

const rootReducers = combineReducers({
    chatReducer: chatReducer,
    editorReducer: editorReducer
});

export default rootReducers;
