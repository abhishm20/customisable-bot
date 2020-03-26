import {BOT_TYPING_TOGGLE, SEND_MSG} from "./types";

let msgIdIndex = 1;

const scrollToBottom = () => {
    setTimeout(() => {
        const objDiv = document.getElementById("chat-thread");
        objDiv.scrollTop = objDiv.scrollHeight;
    }, 100);
};

export const sendMsg = msgData => dispatch => {
    dispatch({
        type: SEND_MSG,
        payload: {...msgData, id: msgIdIndex++}
    });
    scrollToBottom();
    return Promise.resolve();
};

export const botTypingToggle = data => dispatch => {
    dispatch({
        type: BOT_TYPING_TOGGLE,
        payload: data
    });
};
