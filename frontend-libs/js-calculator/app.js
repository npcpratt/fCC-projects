'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _MaterialUI = MaterialUI,
    IconButton = _MaterialUI.IconButton,
    Button = _MaterialUI.Button;

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            initial: true,
            input: '0',
            result: '0'
        };
        _this.inputHandle = _this.inputHandle.bind(_this);
        _this.clearCalc = _this.clearCalc.bind(_this);
        _this.calculateResult = _this.calculateResult.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'inputHandle',
        value: function inputHandle(value) {
            var currentInput = this.state.input;

            // update input
            if (value == '.') {
                /((?<=[.])\d*[.]*)$/.test(currentInput) ? null : this.setState({
                    initial: false,
                    input: currentInput.concat(value)
                });
            } else if (this.state.initial) {
                value == 0 ? null : /[+*/]/g.test(value) ? this.setState({ initial: false, input: '0'.concat(value) }) : this.setState({ initial: false, input: value });
            } else if (/[+*/]/g.test(value)) {
                /([+*/\-]\s)$/.test(currentInput) ? this.setState({
                    input: currentInput.replace(/((\s[+*/]\s)(\s\-\s)?)$/, value)
                }) : this.setState({ input: currentInput.concat(value) });
            } else if (value == ' - ') {
                /(\s-\s)$/.test(currentInput) ? null : this.setState({ input: currentInput.concat(value) });
            } else {
                this.setState({
                    input: currentInput.concat(value)
                });
            }

            // update result
            /[\-.+*/]/g.test(value) ? null : this.state.initial ? this.setState({ result: value }) : this.setState({
                result: eval(currentInput.concat(value))
            });
        }
    }, {
        key: 'calculateResult',
        value: function calculateResult() {
            this.setState({
                input: ''.concat(eval(this.state.input)),
                result: ''.concat(eval(this.state.input))
            });
        }
    }, {
        key: 'clearCalc',
        value: function clearCalc() {
            this.setState({
                initial: true,
                input: '0',
                result: '0'
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                { id: 'calculator' },
                React.createElement(
                    'div',
                    { id: 'displayContainer' },
                    React.createElement(
                        'div',
                        { id: 'display' },
                        this.state.input
                    ),
                    React.createElement(
                        'div',
                        { id: 'result' },
                        this.state.result
                    )
                ),
                React.createElement(
                    'div',
                    { id: 'numbers' },
                    React.createElement(
                        IconButton,
                        { onClick: function onClick() {
                                return _this2.inputHandle('7');
                            }, id: 'seven' },
                        '7'
                    ),
                    React.createElement(
                        IconButton,
                        { onClick: function onClick() {
                                return _this2.inputHandle('8');
                            }, id: 'eight' },
                        '8'
                    ),
                    React.createElement(
                        IconButton,
                        { onClick: function onClick() {
                                return _this2.inputHandle('9');
                            }, id: 'nine' },
                        '9'
                    ),
                    React.createElement(
                        IconButton,
                        { onClick: function onClick() {
                                return _this2.inputHandle('4');
                            }, id: 'four' },
                        '4'
                    ),
                    React.createElement(
                        IconButton,
                        { onClick: function onClick() {
                                return _this2.inputHandle('5');
                            }, id: 'five' },
                        '5'
                    ),
                    React.createElement(
                        IconButton,
                        { onClick: function onClick() {
                                return _this2.inputHandle('6');
                            }, id: 'six' },
                        '6'
                    ),
                    React.createElement(
                        IconButton,
                        { onClick: function onClick() {
                                return _this2.inputHandle('1');
                            }, id: 'one' },
                        '1'
                    ),
                    React.createElement(
                        IconButton,
                        { onClick: function onClick() {
                                return _this2.inputHandle('2');
                            }, id: 'two' },
                        '2'
                    ),
                    React.createElement(
                        IconButton,
                        { onClick: function onClick() {
                                return _this2.inputHandle('3');
                            }, id: 'three' },
                        '3'
                    ),
                    React.createElement(
                        IconButton,
                        { onClick: function onClick() {
                                return _this2.inputHandle('0');
                            }, id: 'zero' },
                        '0'
                    ),
                    React.createElement(
                        IconButton,
                        { onClick: function onClick() {
                                return _this2.inputHandle('.');
                            }, id: 'decimal' },
                        '.'
                    ),
                    React.createElement(
                        IconButton,
                        { onClick: this.calculateResult, id: 'equals' },
                        React.createElement('i', { 'class': 'fas fa-equals' })
                    )
                ),
                React.createElement(
                    'div',
                    { id: 'operators' },
                    React.createElement(
                        Button,
                        { variant: 'contained', color: 'primary', id: 'clear', onClick: this.clearCalc },
                        'AC'
                    ),
                    React.createElement(
                        IconButton,
                        { onClick: function onClick() {
                                return _this2.inputHandle(' / ');
                            }, id: 'divide' },
                        React.createElement('i', { 'class': 'fas fa-divide' })
                    ),
                    React.createElement(
                        IconButton,
                        { onClick: function onClick() {
                                return _this2.inputHandle(' * ');
                            }, id: 'multiply' },
                        React.createElement('i', { 'class': 'fas fa-times' })
                    ),
                    React.createElement(
                        IconButton,
                        { onClick: function onClick() {
                                return _this2.inputHandle(' - ');
                            }, id: 'subtract' },
                        React.createElement('i', { 'class': 'fas fa-minus' })
                    ),
                    React.createElement(
                        IconButton,
                        { onClick: function onClick() {
                                return _this2.inputHandle(' + ');
                            }, id: 'add' },
                        React.createElement('i', { 'class': 'fas fa-plus' })
                    )
                )
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.querySelector('#root'));