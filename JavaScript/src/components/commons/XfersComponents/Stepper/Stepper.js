import React from 'react'
import PropTypes from 'prop-types'
import { StepperHeader, StepperHeaderItem } from 'XfersComponents'

const componentPropTypes = {

  // To overwrite goNext & goBack functions, pass to child components as props;

  initialTab: PropTypes.number,
  children: PropTypes.node,
  header: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      state: PropTypes.bool,
      image: PropTypes.string,
      disabledImage: PropTypes.string,

      // To handle special case where two pages share a same header
      multiple: PropTypes.bool,
      states: PropTypes.arrayOf(PropTypes.shape({state: PropTypes.bool})),
    }
  )),
}

class Stepper extends React.Component {
  constructor(props) {
    super(props);
    const {initialTab = 0} = props;
    this.state = { activeTab: initialTab };
  }

  handleActivateTab = index => () => {
    const {children: {length}} = this.props;
    const activeTab = Math.min(Math.max(index, 0), length);
    this.setState({activeTab});
  }

  renderStepperHeader = () => {
    const {activeTab} = this.state;
    const {header} = this.props;
    if (!header) return;

    // To handle special case where two pages share a same header
    let counter = 0, activeIndex;
    for (let i = 0; i < header.length; i++) {
      if (!header[i].multiple) {
        if (counter == activeTab) { activeIndex = i }
        counter++
      } else {
        const arr = header[i].states.map(() => counter++);
        if (arr.includes(activeTab)) { activeIndex = i }
      }
    }
    return (
      <StepperHeader>
        {header.map((item, index) => (
          <StepperHeaderItem
            key={index}
            {...item}
            active={activeIndex == index} />
          )
        )}
      </StepperHeader>
    );
  }

  render() {
    const {activeTab} = this.state;
    const {children} = this.props;
    const overwriteNextTab = children[activeTab].props.goNext;
    const overwritePreviousTab = children[activeTab].props.goBack;

    return (
      <div>
        {this.renderStepperHeader()}
        {React.cloneElement(
          children[activeTab],
          {
            goNext: overwriteNextTab ? overwriteNextTab :
                    (activeTab !== children.length - 1) ? this.handleActivateTab(activeTab + 1) :
                    undefined,
            goBack: overwritePreviousTab ? overwritePreviousTab :
                    (activeTab !== 0) ? this.handleActivateTab(activeTab - 1) :
                    undefined,
            goToStep: (stepIndex) => this.handleActivateTab(stepIndex)
          }
        )}
      </div>
    );
  }
}

Stepper.propTypes = componentPropTypes;

export default Stepper
