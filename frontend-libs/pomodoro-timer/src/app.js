const { IconButton, Button } = MaterialUI;

'use strict';

let timerArr = [];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            initial: true,
            current: 'Session',
            timeLeft: '25:00',
            timer: null
        }
        this.setLength = this.setLength.bind(this);
        this.start = this.start.bind(this);
        this.reset = this.reset.bind(this);
    }

    setLength(name, value) {
        switch(name) {
            case 'break': ((this.state.breakLength == 1 && value == -1) || (this.state.breakLength == 60 && value == 1))
                        ? null 
                        : this.setState({breakLength: this.state.breakLength + value}); break;
            case 'session': ((this.state.sessionLength == 1 && value == -1) || (this.state.sessionLength == 60 && value == 1))
                        ? null 
                        : this.setState({sessionLength: this.state.sessionLength + value});
        }
    }
    start() {
        this.setState({
            timer: accurateInterval(1000, () => {
                timerArr = this.state.timeLeft.split(':');
                timerArr[1] == '00'
                ? this.setState({timeLeft: ''.concat(timerArr[0]-1 + ':59')})
                : this.setState({timeLeft: ''.concat(timerArr[0] + ':' + timerArr[1] - 1)});
            })
        });
    }
    reset() {
        this.setState({
            timer: null,
            breakLength: 5,
            sessionLength: 25,
            initial: true,
            current: 'Session',
            timeLeft: '25:00'
        })
    }

    render() {
        return (
            <div id="container">
                <div className="duration" id="break">
                    <div className="label" id="break-label">Break Length</div>
                    <div className="length-setter">
                        <IconButton onClick={() => {this.setLength('break', -1)}} id="break-decrement">
                            <i class="material-icons">remove</i>
                        </IconButton>
                        <div className="length" id="break-length">{this.state.breakLength}</div>
                        <IconButton onClick={() => {this.setLength('break', 1)}} id="break-increment">
                            <i class="material-icons">add</i>
                        </IconButton>
                    </div>
                </div>
                <div className="duration" id="session">
                    <div className="label" id="session-label">Session Length</div>
                    <div className="length-setter">
                        <IconButton onClick={() => {this.setLength('session', -1)}} id="session-decrement">
                            <i class="material-icons">remove</i>
                        </IconButton>
                        <div className="length" id="session-length">{this.state.sessionLength}</div>
                        <IconButton onClick={() => {this.setLength('session', 1)}} id="session-increment">
                            <i class="material-icons">add</i>
                        </IconButton>
                    </div>
                </div>
                <div id="timer">
                    <div id="timer-label">{this.state.current}</div>
                    <div id="time-left">{this.state.timeLeft}</div>
                    <div id="timer-controls">
                        <Button variant="contained" color="primary" id="start-stop" onClick={this.start}>
                            <i class="material-icons">play_arrow</i>
                        </Button>
                        <Button variant="outlined" id="reset" onClick={this.reset}>Reset</Button>
                    </div>
                    <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));