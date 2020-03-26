import React from 'react';
import './App.css';
import Editor from './components/editor';
import {Provider} from "react-redux";

import ChatBox from "./components/chatBox";

import store from "./store";
import ChatThread from "./components/chatThread";

function App() {
    return (
        <Provider store={store}>
            <div className="row full-height">
                <div className="column col-6 editor-container">
                    <Editor></Editor>
                </div>
                <div className="column col-6 chat-container">
                    <ChatThread/>
                    <ChatBox/>
                </div>
            </div>
        </Provider>
    );
}

export default App;
