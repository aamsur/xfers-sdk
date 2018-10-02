import React from 'react'
import cx from 'classnames'
import {FlexContainer, FlexItem} from 'XfersLayoutComponents'

import classes from './Stepper.scss'

class Stepper extends React.Component {
  constructor(props) {
    super();
    const {initialTab = 0, limitTab = 0} = props;
    this.state = {
      activeTab: Math.min(initialTab, limitTab)
    }
  }

  componentWillReceiveProps(nextProps) {
    const {initialTab, limitTab} = nextProps;
    if (initialTab != this.state.activeTab) {
      this.setState({activeTab: Math.min(initialTab, limitTab)});
    }
  }

  handleActivateTab = index => () => {
    const {children:{length}, limitTab} = this.props;
    const activeTab = Math.min(Math.max(index, 0), length);
    this.setState({activeTab: Math.min(activeTab, limitTab)});
  };

  getActivateTab = () => {
    const {activeTab} = this.state;
    const {children} = this.props;
    const overwriteNextTab = children[activeTab].props.goNext;
    const overwritePreviousTab = children[activeTab].props.goBack;
    return (React.cloneElement(
      children[activeTab],
      {
        nextStep: overwriteNextTab ? overwriteNextTab: this.handleActivateTab(activeTab + 1),
        previousStep: overwritePreviousTab ? overwritePreviousTab : this.handleActivateTab(activeTab - 1)
      }))
  };

  getTabLabels = () => this.props.children.map(({props:{label = ''}}) => label);

  render() {
    const {activeTab} = this.state;
    const {limitTab, className} = this.props;
    const ActivateTab = this.getActivateTab();
    const tabLabels = this.getTabLabels();
    return (
      <div>
        <StepLabels
          labels={tabLabels}
          activeTab={activeTab}
          activateTab={this.handleActivateTab}
          tabLimit={limitTab}
        />
        <StepUnderLines
          numTabs={tabLabels.length}
          activeTab={activeTab}
          isStepper={true}
        />
        <div>
          {ActivateTab}
        </div>
      </div>
    )
  }
}

function StepLabels({labels, activeTab = 0, activateTab, tabLimit = null}) {
  return (
    <FlexContainer>
      {labels.map((label, index) => {
          const labelClasses = cx(
            classes.step_label,
            "col-xs",
            {
              [classes.activated]: index === activeTab,
              [classes.disabled]: index !== activeTab,
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

function StepUnderLines({activeTab = 0, numTabs}) {
  const pos = activeTab + 1;
  const ratio = 100 / numTabs;
  return (
    <div className={cx(classes.step_underline_container, classes.step_underline_progress)}>
      <span
        className={classes.step_underline}
        style={{width: `${pos * ratio}%`}}
      />
    </div>
  )
}

export default Stepper
