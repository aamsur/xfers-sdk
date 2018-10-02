import cls from './CodeDemoSection.scss'
import PropTypes from 'prop-types'
import { TwoColsRowBar } from 'XfersLayoutComponents'
import { CodeSnippetBlock } from 'XfersBasicComponents'

/*
  <CodeDemoSection title="Demo Components To Be Rendered">
    <DemoComponentsToBeRendered />
    <CodeSnippetBlock>...</CodeSnippetBlock>
  </CodeDemoSection>

*/

function CodeDemoSection({title, demoNode, children}) {
  return (
    <div className={cls.codeDemoSection}>
      <h3>{title}</h3>
      <div className={cls.contentContainer}>
        <TwoColsRowBar
          noSidePadding
          leftColProps={{
            xSize: {md: 5, sm: 12},
            content: children[0]
          }}
          rightColProps={{
            xSize: {md: 7, sm: 12},
            content: children[1]
          }}
        />
      </div>
    </div>
  );
}

CodeDemoSection.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  title: PropTypes.string.isRequired,
}

export default CodeDemoSection
