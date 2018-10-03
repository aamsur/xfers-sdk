import React from 'react'
import PropTypes from 'prop-types'
import { FormLabel } from 'XfersBasicComponents'

const ListingControllerPropTypes = {
  additionNode: PropTypes.node.isRequired,
  itemNode: PropTypes.node.isRequired,
  itemList: PropTypes.array.isRequired,
  onAddition: PropTypes.func.isRequired,
  onRemoval: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
}

function ListingController({
  itemList = [],
  itemNode,
  additionNode,
  onRemoval,
  onAddition,
  maxLength,
}) {
  const onClick = () => {
    if (itemList.length === maxLength) return;
    if (onAddition) onAddition();
  }
  const additionButton = React.cloneElement(additionNode, { onClick });

  return (
    <div>
      { itemList.map((item, index) =>
        React.cloneElement(itemNode, {
          item,
          index,
          itemList,
          key: index,
          onRemoval: (index) => onRemoval(index),
        }))
      }
      { maxLength ?
        (itemList.length < maxLength ? additionButton : null)
        : additionButton
      }
    </div>
  );
}

ListingController.propTypes = ListingControllerPropTypes;
export default ListingController
