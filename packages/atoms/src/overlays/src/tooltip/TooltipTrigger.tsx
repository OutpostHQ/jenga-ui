import { FocusableProvider } from '@react-aria/focus'
import React, { Children, ReactElement, useRef } from 'react'
import { TooltipContext } from './context'
import { useOverlayPosition } from '@react-aria/overlays'
import { useTooltipTrigger } from '@react-aria/tooltip'
import { useTooltipTriggerState } from '@react-stately/tooltip'
import { OverlayWrapper } from '../OverlayWrapper'
import { TooltipTriggerProps } from '@react-types/tooltip'
import { ActiveZone } from '@jenga-ui/active-zone'
import { Block } from '@jenga-ui/core'

const DEFAULT_OFFSET = 8 // Offset needed to reach 4px/5px (med/large) distance between tooltip and trigger button
const DEFAULT_CROSS_OFFSET = 0

export interface JengaTooltipTriggerProps extends TooltipTriggerProps {
  children: [ReactElement | string, ReactElement]
  crossOffset?: number
  offset?: number
  placement?: 'start' | 'end' | 'right' | 'left' | 'top' | 'bottom'
  isMaterial?: boolean
  /** Whether the trigger should have an ActiveZone wrap to make sure it's focusable and hoverable.
   * Otherwise, tooltip won't work. */
  activeWrap?: boolean
}

function TooltipTrigger(props: JengaTooltipTriggerProps) {
  const {
    children,
    activeWrap,
    crossOffset = DEFAULT_CROSS_OFFSET,
    isDisabled,
    isMaterial,
    offset = DEFAULT_OFFSET,
    trigger: triggerAction,
  } = props

  const [trigger, tooltip] = Children.toArray(children)

  const state = useTooltipTriggerState({
    delay: 750,
    ...props,
  })

  const tooltipTriggerRef = useRef(null)
  const overlayRef = useRef(null)

  const { triggerProps, tooltipProps } = useTooltipTrigger(
    {
      isDisabled,
      trigger: triggerAction,
    },
    state,
    tooltipTriggerRef
  )

  const { overlayProps, arrowProps, placement } = useOverlayPosition({
    placement: props.placement || 'top',
    targetRef: tooltipTriggerRef,
    overlayRef,
    offset,
    crossOffset,
    isOpen: state.isOpen,
  })

  if (!activeWrap && typeof trigger === 'string') {
    console.warn(
      'JengaUIKit: Tooltips are only supported on elements that are both focusable and hoverable. To solve this issue you can: 1) Use active element as a trigger (`Button`, `Link`, etc); 2) Use `activeWrap` attribute to automatically wrap the content; 3) Use `ActiveZone` component to manually wrap the content.'
    )

    return <Block>{trigger}</Block>
  }

  function onClick(e) {
    e?.currentTarget?.parentNode.click()
  }

  return (
    <FocusableProvider {...triggerProps} ref={tooltipTriggerRef}>
      {activeWrap ? (
        <ActiveZone onClick={onClick}>{trigger}</ActiveZone>
      ) : (
        trigger
      )}
      <TooltipContext.Provider
        value={{
          state,
          placement,
          ref: overlayRef,
          overlayProps,
          arrowProps,
          minOffset: 'var(--gap)',
          minScale: '1',
          isMaterial,
          ...tooltipProps,
        }}
      >
        {/*{state.isOpen ? tooltip : null}*/}
        <OverlayWrapper
          isOpen={state.isOpen}
          placement={props.placement || 'top'}
        >
          {tooltip}
        </OverlayWrapper>
      </TooltipContext.Provider>
    </FocusableProvider>
  )
}

/**
 * TooltipTrigger wraps around a trigger element and a Tooltip. It handles opening and closing
 * the Tooltip when the user hovers over or focuses the trigger, and positioning the Tooltip
 * relative to the trigger.
 */
const _TooltipTrigger = TooltipTrigger
export { _TooltipTrigger as TooltipTrigger }
