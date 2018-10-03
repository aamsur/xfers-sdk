import React from 'react'
import PropTypes from 'prop-types'

const ListingControllerPropTypes = {
  additionNode: PropTypes.node,
  removalNode: PropTypes.node,
  itemNode: PropTypes.node,
  itemList: PropTypes.array,
  itemDefaultData: PropTypes.object,
  onAddition: PropTypes.func,
  onRemoval: PropTypes.func,
  maxLength: PropTypes.number,
}

const ListingControllerDefaultProps = {
  itemList: [],
}

class ListingController extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activated: false,
    }
  }

  cloneAdditionButton = () => {
    const {additionNode, onAddition} = this.props;

    const onClick = () => {
      const {itemList, maxLength} = this.props;

      if (itemList.length === maxLength) return;
      if (onAddition) onAddition();
    }

    return (
      React.cloneElement(
        additionNode, { onClick }
      )
    )
  }

  cloneRemovalButton = (index) => {
    const {onRemoval, removalNode} = this.props;

    const onClick = (index) => {
      if (onRemoval) onRemoval(index);
    }

    return (
      React.cloneElement(
        removalNode, { onClick: () => {onClick(index)} }
      )
    )
  }

  renderItemDOM = () => {
    const {itemNode, itemList} = this.props;

    let itemListDOM = itemList.map((item, index) => {
      return React.cloneElement(
        itemNode,
        {
          key: index,
          removalNode: this.cloneRemovalButton(index),
          index,
          item,
        }
      )
    });
    return itemListDOM;
  }

  render() {
    const {itemList = [], maxLength} = this.props;

    const additionButton = this.cloneAdditionButton();

    return (
      <div ref={(ref) => {this.container = ref}}>
        {this.renderItemDOM()}
        {(maxLength && (itemList.length < maxLength)) ? additionButton : null}
      </div>
    )
  }
}

function ListingItem({itemListDOM}) {
  return (
    <div>{itemListDOM}</div>
  );
}

ListingController.propTypes = ListingControllerPropTypes;
ListingController.defaultProps = ListingControllerDefaultProps;

export default ListingController
