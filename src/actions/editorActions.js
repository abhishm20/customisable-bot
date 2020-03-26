import {APPLY_CHANGES} from "./types";

export const applyChanges = codeData => dispatch => {
    dispatch({
        type: APPLY_CHANGES,
        payload: codeData
    });
};
