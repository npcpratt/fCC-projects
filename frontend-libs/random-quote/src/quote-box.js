
const e = React.createElement;

class App extends React.Component {
    render() {
        return e(
            <div className="bruh">
                bruh
            </div>
        );
    }
}

const domContainer = document.querySelector('#quote-box');
ReactDOM.render(e(App), domContainer);