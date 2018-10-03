import React from 'react'
import cx from 'classnames'
import classes from './Tabber.scss'
import {FlexContainer, FlexItem} from 'XfersLayoutComponents'

class Tabber extends React.Component {
  constructor(props) {
    super();
    const {initialTab} = props;
    this.state = {
      activeTab: initialTab
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialTab != this.state.activeTab) {
      this.setState({activeTab: nextProps.initialTab});
    }
  }

  handleActivateTab = index => () => {
    const {children:{length}} = this.props;
    const activeTab = Math.min(Math.max(index, 0), length);
    this.setState({activeTab})
  };

  getActivateTab = () => {
    const {activeTab} = this.state;
    const {children} = this.props;
    const overwriteNextTab = children[activeTab].props.goNext;
    const overwritePreviousTab = children[activeTab].props.goBack;

    return (React.cloneElement(
      children[activeTab],
      {
        nextTab: overwriteNextTab ? overwriteNextTab: this.handleActivateTab(activeTab + 1),
        previousTab: overwritePreviousTab ? overwritePreviousTab : this.handleActivateTab(activeTab - 1)
      }))
  };

  getTabLabels = () => this.props.children.map(({props:{label = ''}}) => label);

  render() {
    const {activeTab} = this.state;
    const ActivateTab = this.getActivateTab();
    const tabLabels = this.getTabLabels();
    return (
      <div>
        <TabLabels
          labels={tabLabels}
          activeTab={activeTab}
          activateTab={this.handleActivateTab}
        />
        <TabUnderLines
          numTabs={tabLabels.length}
          activeTab={activeTab}
          isStepper={false}/>
        <div>
          {ActivateTab}
        </div>
      </div>
    )
  }
}

function TabLabels({labels, activeTab, activateTab, tabLimit=null}) {
  return (
    <FlexContainer>
      {labels.map((label, index) => {
          const labelClasses = cx(
            classes.tab_label,
            "col-xs",
            {
              [classes.activated]: index === activeTab,
              [classes.disabled]: index !== activeTab
            }
          );
          return (
            <FlexItem key={index} alignment={{xs: 'middle'}}>
              <button className={labelClasses} onClick={activateTab(index)}>
                {label}
              </button>
            </FlexItem>
          )
        }
      )}
    </FlexContainer>
  )
}

function TabUnderLines({activeTab = 0, numTabs}) {
  const pos = activeTab;
  const ratio = 100 / numTabs;
  return (
    <div className={classes.tab_underline_container}>
      <span
        className={classes.tab_underline}
        style={{width: `${ratio}%`, left: `${pos * ratio}%`}}
      />
    </div>
  )
}

export default Tabber
