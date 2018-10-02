import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import cls from './IconedItemBox.scss'

import {TwoColsRowBar} from 'XfersLayoutComponents'
import nextCaret from 'icons/black_icons/Next_Black.png'

const componentPropTypes = {
	value: PropTypes.node,
	className: PropTypes.string,
	onClick: PropTypes.func,
	type: PropTypes.oneOf([
		'link', 'normal', 'static'
		]),
	icon: PropTypes.node,
	disabled: PropTypes.bool
}

const componentDefaultProps = {
	className: '',
	type: 'normal',
	disabled: false
}

function IconedItemBox({value, className, onClick, type, icon, disabled}) {
	const newClassName = cx(
		className,
		cls.alignedCenter,
		cls.iconedItemBox, {
			[cls.clickable]: type !== 'static',
			[cls.disabled]: disabled
		}
	);

	return(
		<div className={newClassName} onClick={onClick}>
			<div className={cls[`${type}`]}>
				{!icon ?
					<div>{value}</div>
					:
					<TwoColsRowBar
						noSidePadding
						noBottomMargin
						customClass={cls.alignedCenter}
						leftColProps={{
							xSize: {xs: 2},
							content: icon
						}}
						rightColProps={{
							xSize: {xs: 10},
							content: (
								<div className={cx(cls.alignedCenter, cls.spaceBetween)}>
									{value}
									{type === 'normal' && <img className={cls.rightIcon} src={nextCaret}/>}
								</div>
							)
						}}
					/>
				}
			</div>
		</div>
		)
}

IconedItemBox.propTypes = componentPropTypes;
IconedItemBox.defaultProps = componentDefaultProps;

export default IconedItemBox
