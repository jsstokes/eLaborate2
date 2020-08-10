import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { docco as style } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { twilight as style } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './code-block.styles.css';

class CodeBlock extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        console.log("value in Code =Block:", this.props.value);
        return (
            <SyntaxHighlighter language="javascript" style={style}>
              {this.props.value}
            </SyntaxHighlighter>
          );
        
        // return(
        //     <div className='CodeBlock'>
        //         <pre>
        //             {this.props.value}
        //         </pre>
        //     </div>
        // );

    }
}

export default CodeBlock;