import React from 'react';
import { connect } from 'react-redux';

import { showMessage, hideMessage } from '../actions/DashboardAction';

class Table extends React.Component {

  constructor() {
    super();
    this.timer = undefined;
    this.initialData = {
      primaryCounter: 0,
      secondaryCounter: 0,
      currentMessageIndex: 0,
    };
    this.state = this.initialData;
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidUpdate() {

    if (this.props.mainMessage.length > 0){
    	window.setTimeout(() => {
        	this.props.hideMessage();
      	}, 10000);    	
    }
  }

  startTimer() {
    if (this.timer === undefined) {
      this.timer = setInterval(() => {
        let stateObj = {};

        if (this.state.primaryCounter > 0 && (this.state.primaryCounter + 1) % 10 === 0) {
          if ((this.state.primaryCounter + 1) % 30 === 0) {
            let index = (this.props.messages.length - 1) > this.state.currentMessageIndex ?
               (this.state.currentMessageIndex + 1) : 0;
            stateObj['currentMessageIndex'] = index;
            this.props.displayMessage(this.state.currentMessageIndex);
          }
          stateObj['secondaryCounter'] = this.state.secondaryCounter + 1;
        }
        stateObj['primaryCounter'] = this.state.primaryCounter + 1;
        this.setState(stateObj);

      }, 1000);
    }
  };

  stopTimer(state) {
    clearInterval(this.timer);
    this.timer = undefined;
    if (state === 'stop') this.setState(this.initialData);
  };

  render() {
    let  { mainMessage } = this.props;
    // console.log(this.props);
    return (
      <div>
        <button onClick={this.startTimer}>Start timer</button>
        <button onClick={() => this.stopTimer('pause')}>Pause timer</button>
        <button onClick={() => this.stopTimer('stop')}>Stop timer</button>
        <br/>
        <span>{this.state.primaryCounter}</span>
        <span>--------</span>
        <span>{this.state.secondaryCounter}</span>
        <br/>
        {mainMessage && mainMessage.length > 0 && <span>{mainMessage}</span> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
	mainMessage: state.saveActionReducer.mainMessage,
  	messages: state.saveActionReducer.messages,
});

const mapDispatchToProps = (dispatch) => ({
	hideMessage: () => {
		dispatch(hideMessage());
	},
	displayMessage: (index) => {
		dispatch(showMessage(index));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);