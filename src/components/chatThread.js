import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import bot from '../img/bot@2x.png';
import waiting from '../img/waiting.gif';
import local_user from '../img/local_user.png';

class ChatThread extends React.Component {
    render() {
        const msgList = this.props.msgList.map(msg => {
            if (msg.user === 'local_user') {
                return <div key={msg.id} className="chat-msg-box">
                    <img alt="local user" className="float-right" style={{'marginLeft': '10px', 'height': '27px'}}
                         src={local_user}/>
                    <div className="chat-msg float-right">{msg.text}</div>
                </div>
            } else {
                return <div key={msg.id} className="chat-msg-box">
                    <img alt="bot user" src={bot} style={{'float': 'left', 'marginRight': '10px'}}/>
                    <div className="chat-msg">{msg.text}</div>
                </div>
            }
        });
        return (
                <div className="card-view" id="chat-thread">
                    {msgList}
                    {
                        this.props.isBotTyping ?
                            <div className="chat-msg-box">
                                <img alt="bot user" src={bot}
                                     style={{'float': 'left', 'marginTop': '12px', 'marginRight': '10px'}}/>
                                <img alt="loading" src={waiting} style={{'float': 'left', 'height': '50px'}}/>
                            </div> : null
                    }
                </div>
        );
    }
}

ChatThread.propTypes = {
    msgList: PropTypes.array.isRequired,
    isBotTyping: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    msgList: state.chatReducer.msgList,
    isBotTyping: state.chatReducer.isBotTyping
});

export default connect(mapStateToProps, {})(ChatThread);
