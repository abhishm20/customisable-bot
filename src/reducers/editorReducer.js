import {APPLY_CHANGES} from '../actions/types';

const initialState = {
    currentCode: ""
};

export default function (state = initialState, action) {
    if (action.type === APPLY_CHANGES) {
        return {
            ...state,
            currentCode: action.payload.code
        };
    } else {
        return state;
    }
}
