import React from 'react';
import {connect} from 'react-redux';
import MonacoEditor from 'react-monaco-editor';
import {applyChanges} from "../actions/editorActions";
import {safe_eval} from "../controllers/safeEvaluate";

let tabCounter = 0;

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            applyChangesButtonActive: false,
            isCodeChanged: false,
            tabs: [],
            currentTabIndex: -1
        };

        this.onChange = this.onChange.bind(this);
        this.onApply = this.onApply.bind(this);
        this.addTab = this.addTab.bind(this);
        this.changeTab = this.changeTab.bind(this);
        this.setEditorCode = this.setEditorCode.bind(this);
        this.closeCurrentTab = this.closeCurrentTab.bind(this);
    }

    componentDidMount() {
        this.addTab();
    }

    closeCurrentTab() {
        let nextTab = 0;
        if (this.state.currentTabIndex > -1 && this.state.currentTabIndex < this.state.tabs.length - 1) {
            nextTab = this.state.currentTabIndex;
        }else{
            nextTab = this.state.currentTabIndex - 1;
        }
        console.log(nextTab, this.state.currentTabIndex, this.state.tabs.length)
        this.setState({
            tabs: [...this.state.tabs.filter((tab, index) => this.state.currentTabIndex !== index)]
        });
        this.setState({
            currentTabIndex: nextTab
        });
    }

    onChange(newValue, e) {
        let applyChangesButtonActive = false;
        try {
            safe_eval(newValue);
            applyChangesButtonActive = true;
        } catch (e) {
            applyChangesButtonActive = false;
        }
        this.setState({'applyChangesButtonActive': applyChangesButtonActive});
        this.setState({'isCodeChanged': true});

        this.setState({
            tabs: [...this.state.tabs.map((tab, index) => (this.state.currentTabIndex === index ? {
                ...tab,
                code: newValue,
                isCodeChanged: true,
                applyChangesButtonActive: applyChangesButtonActive
            } : {...tab}))]
        });
        this.setEditorCode(newValue);
    }

    setEditorCode(code) {
        this.setState({'code': code})
    }

    onApply() {
        let currentTab = this.state.tabs[this.state.currentTabIndex];
        const codeData = {
            code: currentTab.code
        };
        this.props.applyChanges(codeData);
        this.setState({
            tabs: [...this.state.tabs.map((tab, index) => (this.state.currentTabIndex === index ? {
                ...tab,
                appliedCode: tab.code,
                isCodeChanged: false,
                applyChangesButtonActive: false
            } : {...tab}))],
            applyChangesButtonActive: false,
            isCodeChanged: false
        });
    }

    addTab() {
        const initialCode = '// write your bot\'s logic in the below function\nfunction response(inputText){\n\treturn inputText;\n}';
        const tabName = tabCounter ? `index(${tabCounter}).js` : 'index.js';
        this.setState({
            tabs: [
                ...this.state.tabs,
                {
                    name: tabName,
                    code: initialCode,
                    appliedCode: initialCode,
                    isCodeChanged: false,
                    applyChangesButtonActive: false
                }
            ],
            currentTabIndex: this.state.currentTabIndex + 1
        }, () => {
            this.onApply(tabName);
        });
        tabCounter ++;
        this.setEditorCode(initialCode);
    }

    changeTab(e) {
        const tabIndex = parseInt(e.target.name);
        let currentTab = this.state.tabs[tabIndex];
        this.setState({
            applyChangesButtonActive: currentTab.applyChangesButtonActive,
            isCodeChanged: currentTab.isCodeChanged,
            currentTabIndex: tabIndex
        });
        this.setEditorCode(currentTab.code);
        const codeData = {
            code: currentTab.appliedCode
        };
        this.props.applyChanges(codeData);
    }

    render() {
        const options = {
            automaticLayout: 'on',
            selectOnLineNumbers: true,
            colorDecorators: true
        };
        let buttonName = "";
        if (this.state.isCodeChanged) {
            buttonName = "Apply Changes";
        } else {
            buttonName = "Changes Applied";
        }

        let closeButton = "";
        if (this.state.tabs && this.state.tabs.length > 1) {
            closeButton = <a href onClick={this.closeCurrentTab} className="close-tab-span">x</a>
        }

        const tabList = this.state.tabs.map((tab, index) => {
            if (index === this.state.currentTabIndex) {
                return <button key={tab.name} className="tab-links tab-element active mr-3">{tab.name}
                    {closeButton}
                </button>
            } else {
                return <button key={tab.name} onClick={this.changeTab} name={index}
                               className="tab-links tab-element">{tab.name}</button>
            }
        });

        return (
            <div className="m-10" style={{'height': '95%'}}>
                <div className="tab">
                    {tabList}
                    <button className="tab-add tab-element" onClick={this.addTab}>+</button>

                    <button className="apply-changes" onClick={this.onApply}
                            disabled={!this.state.applyChangesButtonActive}>
                        {buttonName}
                        {this.state.applyChangesButtonActive}</button>
                </div>
                <div className="full-height">
                    <MonacoEditor
                        // width="600"
                        // height="800"
                        language="typescript"
                        theme="vs-dark"
                        value={this.state.code}
                        options={options}
                        onChange={this.onChange}
                    />
                </div>
            </div>
        );
    }
}


export default connect(null, {applyChanges})(Editor);
