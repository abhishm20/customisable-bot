import {BOT_TYPING_TOGGLE, SEND_MSG} from '../actions/types';

const initialState = {
    msgList: [],
    isBotTyping: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SEND_MSG:
            return {
                ...state,
                msgList: [
                    ...state.msgList,
                    action.payload
                ]
            };
        case BOT_TYPING_TOGGLE:
            return {
                ...state,
                isBotTyping: action.payload.isBotTyping
            };
        default:
            return state;
    }
}
