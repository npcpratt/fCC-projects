'use strict';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div id="calculator">
                <h1>henlo</h1>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));