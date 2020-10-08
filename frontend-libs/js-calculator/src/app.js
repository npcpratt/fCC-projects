'use strict';

const { IconButton, Button } = MaterialUI;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initial: true,
            input: '0',
            result: '0'
        }
        this.inputHandle = this.inputHandle.bind(this);
        this.clearCalc = this.clearCalc.bind(this);
        this.calculateResult = this.calculateResult.bind(this);
    }

    inputHandle(value) {
        const currentInput = this.state.input;

        // update input
        if(value == '.') {
            /((?<=[.])\d*[.]*)$/.test(currentInput)
            ? null
            : this.setState({
                initial: false,
                input: currentInput.concat(value)
            });
        } else if(this.state.initial) {
            value == 0
            ? null
            : /[+*/]/g.test(value)
              ? this.setState({initial: false, input: '0'.concat(value)})
              : this.setState({initial: false, input: value});
        } else if(/[+*/]/g.test(value)) {
            /([+*/\-]\s)$/.test(currentInput)
            ? this.setState({
                input: currentInput.replace(/((\s[+*/]\s)(\s\-\s)?)$/, value)
              })
            : this.setState({input: currentInput.concat(value)});
        } else if(value == ' - ') {
            /(\s-\s)$/.test(currentInput)
            ? null
            : this.setState({input: currentInput.concat(value) });
        } else {
            this.setState({
                input: currentInput.concat(value)
            });
        }

        // update result
        /[\-.+*/]/g.test(value)
        ? null
        : this.state.initial
            ? this.setState({result: value})
            : this.setState({
                result: eval(currentInput.concat(value))
            });
    }
    calculateResult() {
        this.setState({
            input: ''.concat(eval(this.state.input)),
            result: ''.concat(eval(this.state.input))
        });
    }
    clearCalc() {
        this.setState({
            initial: true,
            input: '0',
            result: '0'
        })
    }

    render() {
        return (
            <div id="calculator">
                <div id="displayContainer">
                    <div id="display">{this.state.input}</div>
                    <div id="result">{this.state.result}</div>
                </div>
                <div id="numbers">
                    <IconButton onClick={() => this.inputHandle('7')} id="seven">7</IconButton>
                    <IconButton onClick={() => this.inputHandle('8')} id="eight">8</IconButton>
                    <IconButton onClick={() => this.inputHandle('9')} id="nine">9</IconButton>
                    <IconButton onClick={() => this.inputHandle('4')} id="four">4</IconButton>
                    <IconButton onClick={() => this.inputHandle('5')} id="five">5</IconButton>
                    <IconButton onClick={() => this.inputHandle('6')} id="six">6</IconButton>
                    <IconButton onClick={() => this.inputHandle('1')} id="one">1</IconButton>
                    <IconButton onClick={() => this.inputHandle('2')} id="two">2</IconButton>
                    <IconButton onClick={() => this.inputHandle('3')} id="three">3</IconButton>
                    <IconButton onClick={() => this.inputHandle('0')} id="zero">0</IconButton>
                    <IconButton onClick={() => this.inputHandle('.')} id="decimal">.</IconButton>
                    <IconButton onClick={this.calculateResult} id="equals"><i class="fas fa-equals"></i></IconButton>
                </div>
                <div id="operators">
                    <Button variant="contained" color="primary" id="clear" onClick={this.clearCalc}>AC</Button>
                    <IconButton onClick={() => this.inputHandle(' / ')} id="divide"><i class="fas fa-divide"></i></IconButton>
                    <IconButton onClick={() => this.inputHandle(' * ')} id="multiply"><i class="fas fa-times"></i></IconButton>
                    <IconButton onClick={() => this.inputHandle(' - ')} id="subtract"><i class="fas fa-minus"></i></IconButton>
                    <IconButton onClick={() => this.inputHandle(' + ')} id="add"><i class="fas fa-plus"></i></IconButton>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));