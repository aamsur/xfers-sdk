import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import cls from './Divider.scss'

const componentPropTypes = {
  customClass: PropTypes.string
}

const componentDefaultProps = {
  customClass: ''
}

function Divider({children, customClass, marginTop, marginBtm}) {
	const dividerClass = cx({
		[cls.marginTop]: marginTop,
		[cls.marginBtm]: marginBtm,
	}, cls.divider, customClass);

	const labeledDividerDOM = (
		<div className={dividerClass}>
			<hr/>
	    <span>{children}</span>
	    <hr/>
		</div>
	)

	const defaultDividerDOM = (
		<div className={dividerClass}>
			<hr/>
		</div>
	)

  return(
  	<div>
	    {
	    	children ? labeledDividerDOM : defaultDividerDOM
	    }
    </div>
  )
}

Divider.propTypes = componentPropTypes;
Divider.defaultProps = componentDefaultProps;

export default Divider