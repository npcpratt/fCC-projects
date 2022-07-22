'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var placeholder = "# Minimal Markdown Previewer\n----------------------------\n\n## Made with React | [View source on GitHub](https://github.com/pratvar/fCC-projects/tree/master/frontend-libs/markdown-previewer/src)\nThis is `inline code`\n\n```\n//this is a code block\n\nconst helloWorld = () => {\n  console.log('Hello World')\n}\n\n```\n\nThis is a **list**:\n- list item\n - indented list item\n - indented list item\n   - indentation level 2\n   - another one\n- we the best music\n- another one\n\n\n![React Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/200px-React-icon.svg.png) \n\n> This is an image\n\nThat's a blockquote ^\n";

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            input: placeholder
        };
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: "handleChange",
        value: function handleChange(e) {
            this.setState({
                input: e.target.value
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "container" },
                React.createElement(
                    "div",
                    { className: "editor" },
                    React.createElement(
                        "div",
                        { id: "titlebar" },
                        "Editor"
                    ),
                    React.createElement("textarea", { id: "editor", value: this.state.input, onChange: this.handleChange })
                ),
                React.createElement("div", { id: "preview", dangerouslySetInnerHTML: { __html: marked.parse(this.state.input) } })
            );
        }
    }]);

    return App;
}(React.Component);

var domContainer = document.querySelector("#app");
ReactDOM.render(e(App), domContainer);