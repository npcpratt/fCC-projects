const { IconButton, Button, Fab } = MaterialUI;

'use strict';

let timer = null;
const leadingZero = num => {
    if(num < 10) return '0' + num;
    return num;
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            timerActive: false,
            current: 'Session',
            minLeft: '25',
            secLeft: '00'
        }
        this.setLength = this.setLength.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
        this.timerFunc = this.timerFunc.bind(this);
    }

    setLength(name, value) {
        switch(name) {
            case 'break': if((this.state.breakLength == 1 && value == -1)
                          || (this.state.breakLength == 60 && value == 1)) break;
                          else {
                            this.setState({breakLength: this.state.breakLength + value,}); 
                            break;
                          }
            case 'session': if((this.state.sessionLength == 1 && value == -1) 
                            || (this.state.sessionLength == 60 && value == 1)) break;
                            else {
                                this.setState({
                                    sessionLength: this.state.sessionLength + value,
                                    minLeft: leadingZero(parseInt(this.state.minLeft) + value)
                                });
                            }
        }
    }

    timerFunc() {

        // switch to break when session completes and vice versa, also play beep
        if(this.state.minLeft == '00' && this.state.secLeft == '00') {
            switch(this.state.current) {
                case 'Session' : this.setState({
                    current: 'Break',
                    minLeft: this.state.breakLength
                }); break;
                case 'Break' : this.setState({
                    current: 'Session',
                    minLeft: this.state.sessionLength
                });
            }
            const beep = document.querySelector("#beep");
            beep.currentTime = 0;
            beep.play();
        }

        // countdown
        if(this.state.secLeft == '00') 
            this.setState({
                minLeft: leadingZero(parseInt(this.state.minLeft) - 1),
                secLeft: '59'
            });
        else this.setState({
            secLeft: leadingZero(parseInt(this.state.secLeft)-1)
        });
    }
    start() {
        timer = accurateInterval(100, this.timerFunc);
        this.setState({timerActive: true});
    }
    stop() {
        timer.cancel();
        this.setState({timerActive: false});
    }
    reset() {
        if(this.state.timerActive) timer.cancel();
        this.setState({
            breakLength: 5,
            sessionLength: 25,
            timerActive: false,
            current: 'Session',
            minLeft: '25',
            secLeft: '00'
        })
        document.querySelector('#beep').pause();
    }

    render() {
        const timerActive = this.state.timerActive;
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
                    <div id="time-left">{this.state.minLeft + ':' + this.state.secLeft}</div>
                    <div id="timer-controls">
                        <Fab variant="contained" color="primary" id="start-stop" onClick={!timerActive ? this.start : this.stop}>
                            {!timerActive ? <i class="material-icons">play_arrow</i> : <i class="material-icons">pause</i>}
                        </Fab>
                        <Fab size="medium" variant="outlined" id="reset" onClick={this.reset}><i class="material-icons">refresh</i></Fab>
                    </div>
                    <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));