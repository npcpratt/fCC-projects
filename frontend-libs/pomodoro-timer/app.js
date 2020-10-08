var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _MaterialUI = MaterialUI,
    IconButton = _MaterialUI.IconButton,
    Button = _MaterialUI.Button;


'use strict';

var timerArr = [];

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            breakLength: 5,
            sessionLength: 25,
            initial: true,
            current: 'Session',
            timeLeft: '25:00',
            timer: null
        };
        _this.setLength = _this.setLength.bind(_this);
        _this.start = _this.start.bind(_this);
        _this.reset = _this.reset.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'setLength',
        value: function setLength(name, value) {
            switch (name) {
                case 'break':
                    this.state.breakLength == 1 && value == -1 || this.state.breakLength == 60 && value == 1 ? null : this.setState({ breakLength: this.state.breakLength + value });break;
                case 'session':
                    this.state.sessionLength == 1 && value == -1 || this.state.sessionLength == 60 && value == 1 ? null : this.setState({ sessionLength: this.state.sessionLength + value });
            }
        }
    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            this.setState({
                timer: accurateInterval(1000, function () {
                    timerArr = _this2.state.timeLeft.split(':');
                    timerArr[1] == '00' ? _this2.setState({ timeLeft: ''.concat(timerArr[0] - 1 + ':59') }) : _this2.setState({ timeLeft: ''.concat(timerArr[0] + ':' + timerArr[1] - 1) });
                })
            });
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.setState({
                timer: null,
                breakLength: 5,
                sessionLength: 25,
                initial: true,
                current: 'Session',
                timeLeft: '25:00'
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement(
                'div',
                { id: 'container' },
                React.createElement(
                    'div',
                    { className: 'duration', id: 'break' },
                    React.createElement(
                        'div',
                        { className: 'label', id: 'break-label' },
                        'Break Length'
                    ),
                    React.createElement(
                        'div',
                        { className: 'length-setter' },
                        React.createElement(
                            IconButton,
                            { onClick: function onClick() {
                                    _this3.setLength('break', -1);
                                }, id: 'break-decrement' },
                            React.createElement(
                                'i',
                                { 'class': 'material-icons' },
                                'remove'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'length', id: 'break-length' },
                            this.state.breakLength
                        ),
                        React.createElement(
                            IconButton,
                            { onClick: function onClick() {
                                    _this3.setLength('break', 1);
                                }, id: 'break-increment' },
                            React.createElement(
                                'i',
                                { 'class': 'material-icons' },
                                'add'
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'duration', id: 'session' },
                    React.createElement(
                        'div',
                        { className: 'label', id: 'session-label' },
                        'Session Length'
                    ),
                    React.createElement(
                        'div',
                        { className: 'length-setter' },
                        React.createElement(
                            IconButton,
                            { onClick: function onClick() {
                                    _this3.setLength('session', -1);
                                }, id: 'session-decrement' },
                            React.createElement(
                                'i',
                                { 'class': 'material-icons' },
                                'remove'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'length', id: 'session-length' },
                            this.state.sessionLength
                        ),
                        React.createElement(
                            IconButton,
                            { onClick: function onClick() {
                                    _this3.setLength('session', 1);
                                }, id: 'session-increment' },
                            React.createElement(
                                'i',
                                { 'class': 'material-icons' },
                                'add'
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { id: 'timer' },
                    React.createElement(
                        'div',
                        { id: 'timer-label' },
                        this.state.current
                    ),
                    React.createElement(
                        'div',
                        { id: 'time-left' },
                        this.state.timeLeft
                    ),
                    React.createElement(
                        'div',
                        { id: 'timer-controls' },
                        React.createElement(
                            Button,
                            { variant: 'contained', color: 'primary', id: 'start-stop', onClick: this.start },
                            React.createElement(
                                'i',
                                { 'class': 'material-icons' },
                                'play_arrow'
                            )
                        ),
                        React.createElement(
                            Button,
                            { variant: 'outlined', id: 'reset', onClick: this.reset },
                            'Reset'
                        )
                    ),
                    React.createElement('audio', { id: 'beep', src: 'https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav' })
                )
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.querySelector('#root'));