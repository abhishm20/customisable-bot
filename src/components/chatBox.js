import React from 'react';
import {connect} from 'react-redux';
import {botTypingToggle, sendMsg} from '../actions/chatActions'
import PropTypes from "prop-types";
import {safe_eval} from "../controllers/safeEvaluate";


class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            user: "local_user"
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.userSendMsg = this.userSendMsg.bind(this);
        this.botSendMsg = this.botSendMsg.bind(this);
    }

    userSendMsg() {
        const myMsgData = {
            text: this.state.text,
            user: this.state.user
        };
        this.props.sendMsg(myMsgData);
    }

    botSendMsg(evaluatedCode) {
        this.props.botTypingToggle({isBotTyping: true});
        let botResponse = "";
        botResponse = evaluatedCode(this.state.text);

        if (typeof botResponse == "object") {
            botResponse.then(msg => {
                console.log(msg);
                setTimeout(() => {
                    const msgData = {
                        text: msg,
                        user: "bot"
                    };
                    this.props.botTypingToggle({isBotTyping: false});
                    this.props.sendMsg(msgData)
                }, 500);
            })
        } else {
            const msgData = {
                text: botResponse,
                user: "bot"
            };
            this.props.botTypingToggle({isBotTyping: false});
            this.props.sendMsg(msgData)
        }
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        if (!(this.state.text && this.state.text.trim())) {
            return
        }
        try {
            const evaluatedCode = safe_eval(this.props.currentCode);
            this.userSendMsg();
            this.botSendMsg(evaluatedCode);
            this.setState({text: ""});
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className="chatbox">
                <form onSubmit={this.onSubmit}>
                    <input name="text" className="chatbox-input" placeholder="type message here..." onChange={this.onChange}
                           value={this.state.text}/>
                    <button type="submit" hidden>Submit</button>
                </form>
            </div>
        );
    }
}

ChatBox.propTypes = {
    currentCode: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    currentCode: state.editorReducer.currentCode
});

export default connect(mapStateToProps, {sendMsg, botTypingToggle})(ChatBox);
