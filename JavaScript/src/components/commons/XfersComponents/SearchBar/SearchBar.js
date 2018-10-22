import React from 'react'
import PropTypes from 'prop-types'
import cls from './SearchBar.scss'
import { View, FormDelayedInput } from 'XfersComponents'
import searchIcon from 'icons/black_icons/Search_Black.png'

const componentPropTypes = {
  delay: PropTypes.number,
  customClass: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onExecute: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  caption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  placeholder: PropTypes.string,
  type: PropTypes.string,
}

const componentDefaultProps = {
  delay: 500,
  disabled: false,
  customClass: '',
  type: 'text',
  value: '',
}

function SearchBar(props) {
  return (
    <View customClass={cls.searchBar}>
      <View flex="1">
        <FormDelayedInput {...props} />
      </View>
      <img className={cls.searchIcon} src={searchIcon} />
    </View>
  )
}

SearchBar.propTypes = componentPropTypes;
SearchBar.defaultProps = componentDefaultProps;

export default SearchBar
