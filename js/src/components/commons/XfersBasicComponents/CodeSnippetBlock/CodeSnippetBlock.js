import React from 'react'
import cls from './CodeSnippetBlock.scss'
import PropTypes from 'prop-types'

import ReactDOMServer from 'react-dom/server';
import Prism from 'prismjs'
import '!style-loader!css-loader!prismjs/themes/prism-tomorrow.css'
import '!style-loader!css-loader!prismjs/plugins/line-numbers/prism-line-numbers.css'

class CodeSnippetBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ele: null }
  }

  render() {
    const { children } = this.props;
    const markUpString = Prism.highlight(children, Prism.languages.jsx);

    setTimeout(() => {
      Prism.highlightAll();
    }, 0);
    return (
      <div>
        <pre className="line-numbers language-jsx">
          <code className="language-jsx" dangerouslySetInnerHTML={{__html: markUpString}} />
        </pre>
      </div>
    )
  }
}

CodeSnippetBlock.propTypes = {
  children: PropTypes.string.isRequired
}

CodeSnippetBlock.defaultProps = {
  children: ''
}

export default CodeSnippetBlock

// <div dangerouslySetInnerHTML={{__html: Prism.highlight(`<pre><code>${children}</code></pre>`, Prism.languages.jsx, 'jsx')}}/>
