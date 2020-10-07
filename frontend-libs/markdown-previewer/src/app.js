

'use strict';

const e = React.createElement;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({
            input: e.target.value
        })
    }
    render() {
        return (
            <div className="container">
                <textarea id="editor" value={this.state.input} onChange={this.handleChange}></textarea>
                <div id="preview" dangerouslySetInnerHTML={{__html: marked(this.state.input)}}></div>
            </div>
            
        );
    }
}


const domContainer = document.querySelector("#app");
ReactDOM.render(e(App), domContainer);