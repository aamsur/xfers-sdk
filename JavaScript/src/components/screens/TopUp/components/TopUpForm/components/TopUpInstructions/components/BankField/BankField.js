import React from 'react'
import PropTypes from 'prop-types'
import { View, TwoColsRowBar, CopyBox, Text } from 'XfersComponents'

import cls from './BankField.scss'

const stepComponentPropTypes = {
  stepOrder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  stepHeader: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  children: PropTypes.node
}

export function StepContainer({ stepOrder, stepHeader, children }) {
  return (
    <View customClass={cls.stepContainer}>
      <TwoColsRowBar
        noBottomMargin
        leftColProps={{
          size: { xs: 1 },
          content: <Text customClass={cls.stepOrderLabel}>{stepOrder}</Text>
        }}
        rightColProps={{
          content: (
            <View paddingLeft="10px">
              <View>{stepHeader}</View>
              {children}
            </View>
          )
        }}
      />
    </View>
  );
}

export function FieldContainer({ children }) {
  return (
    <View>{children}</View>
  );
}

export function Field({ label, value, toBeCopied }) {
  return (
    <View customClass={cls.fieldContainer}>
      <Text customClass={cls.fieldLabel}>{label}</Text>
      { toBeCopied ? <CopyBox valueToBeCopied={value} /> :
        <Text customClass={cls.fieldValue}>{value}</Text>
      }
    </View>
  )
}

StepContainer.propTypes = stepComponentPropTypes;
