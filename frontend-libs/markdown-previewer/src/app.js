

'use strict';

const e = React.createElement;

const placeholder = `# Minimal Markdown Previewer
----------------------------

## Made with React | [View source on GitHub](https://github.com/pratvar/fCC-projects/tree/master/frontend-libs/markdown-previewer/src)
This is \`inline code\`

\`\`\`
//this is a code block

const helloWorld = () => {
  console.log('Hello World')
}

\`\`\`

This is a **list**:
- list item
 - indented list item
 - indented list item
   - indentation level 2
   - another one
- we the best music
- another one


![React Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/200px-React-icon.svg.png) 

> This is an image

That's a blockquote ^
`

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: placeholder
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
                <div className="editor">
                    <div id="titlebar">Editor</div>
                    <textarea id="editor" value={this.state.input} onChange={this.handleChange}></textarea>
                </div>
                <div id="preview" dangerouslySetInnerHTML={{__html: marked(this.state.input)}} />
            </div>
            
        );
    }
}


const domContainer = document.querySelector("#app");
ReactDOM.render(e(App), domContainer);