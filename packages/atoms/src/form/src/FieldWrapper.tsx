/* eslint-disable react/prop-types */
import React, { forwardRef, ReactNode } from 'react'
import { Label } from './Label'
import { Element, Styles } from 'tastycss-react'
import {
  LabelPosition,
  NecessityIndicator,
  ValidationState,
} from '@jenga-ui/core'
import { TooltipProvider } from '@jenga-ui/overlays'
import { InfoCircleOutlined } from '@ant-design/icons'

const FIELD_STYLES = {
  display: 'grid',
  gridColumns: {
    '': '1fr',
    'has-sider': 'auto 1fr',
  },
  gap: {
    '': '1x',
    'has-sider': '@(column-gap, 1x)',
  },
  placeItems: 'baseline stretch',
}

const MESSAGE_STYLES = {
  preset: 'default',
  color: {
    '': '#dark.75',
    invalid: '#danger-text',
    valid: '#success-text',
    disabled: '#dark.40',
  },
  fontWeight: 400,
  textAlign: 'left',
  column: {
    '': 1,
    'has-sider': 2,
  },
  userSelect: 'none',
}

export type FieldWrapperProps = {
  as: string
  labelPosition: LabelPosition
  label?: string
  styles?: Styles
  isRequired?: boolean
  isDisabled?: boolean
  labelStyles?: Styles
  necessityIndicator?: NecessityIndicator
  labelProps?: any
  fieldProps?: any
  message?: string | ReactNode
  messageStyles?: Styles
  Component?: JSX.Element
  validationState?: ValidationState
  requiredMark?: boolean
  tooltip?: ReactNode
}

function FieldWrapper(props, ref) {
  const {
    as,
    labelPosition,
    label,
    styles,
    isRequired,
    isDisabled,
    labelStyles,
    necessityIndicator,
    labelProps,
    fieldProps,
    message,
    messageStyles,
    Component,
    validationState,
    requiredMark = true,
    tooltip,
  } = props

  const mods = {
    'has-sider': labelPosition === 'side' && label,
    invalid: validationState === 'invalid',
    valid: validationState === 'valid',
  }

  return (
    <Element
      as={as || 'div'}
      qa="Field"
      ref={ref}
      mods={mods}
      styles={{
        ...FIELD_STYLES,
        ...styles,
      }}
      {...fieldProps}
    >
      {label && (
        <Label
          as={as === 'label' ? 'div' : 'label'}
          styles={labelStyles}
          labelPosition={labelPosition}
          isRequired={requiredMark ? isRequired : false}
          isDisabled={isDisabled}
          necessityIndicator={necessityIndicator}
          validationState={validationState}
          {...labelProps}
        >
          {label}
          {tooltip ? (
            <>
              &nbsp;
              <TooltipProvider
                title={tooltip}
                activeWrap
                width="initial max-content 40x"
              >
                <InfoCircleOutlined style={{ color: 'var(--primary-color)' }} />
              </TooltipProvider>
            </>
          ) : null}
        </Label>
      )}
      {Component}
      {message && !isDisabled && (
        <Element
          mods={mods}
          styles={{
            ...MESSAGE_STYLES,
            ...messageStyles,
          }}
          role={validationState === 'invalid' ? 'alert' : undefined}
        >
          {message}
        </Element>
      )}
    </Element>
  )
}

/**
 * A wrapper for form fields to provide additional decoration for inputs.
 */
const _FieldWrapper = forwardRef(FieldWrapper)
export { _FieldWrapper as FieldWrapper }
