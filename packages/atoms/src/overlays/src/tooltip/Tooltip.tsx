/* eslint-disable prefer-const */
import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from 'react'
import { mergeProps } from '@jenga-ui/core'
import { createDOMRef } from '@react-spectrum/utils'
import { TooltipContext } from './context'
import { useTooltip } from '@react-aria/tooltip'
import { Element } from 'tastycss-react'
import { extractStyles } from 'tastycss-react'
import { CONTAINER_STYLES } from 'tastycss-react'
import { useContextStyles } from 'tastycss-react'
import { getOverlayTransitionCSS } from '@jenga-ui/core'
import { Styles } from 'tastycss-react'
import { BaseProps, ContainerStyleProps } from 'tastycss-react'
import { AriaTooltipProps } from '@react-types/tooltip'
import { PlacementAxis } from '@jenga-ui/core'

const TOOLTIP_STYLES: Styles = {
  display: 'block',
  fill: '#dark.85',
  color: '#white',
  width: 'initial 36x max-content',
  radius: true,
  padding: '.75x 1x',
  preset: 't3',
  backdropFilter: 'blur(.5x)',
  whiteSpace: 'pre-line',
}

const TIP_STYLES: Styles = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  border: '.5x #clear',
  borderTop: '.5x solid #dark.85',
  borderBottom: '0',
  top: {
    '': 'initial',
    '[data-placement="left"] | [data-placement="right"]': '50%',
    '[data-placement="top"]': '100%',
  },
  left: {
    '': 'initial',
    '[data-placement="top"] | [data-placement="bottom"]': '50%',
    '[data-placement="left"]': '100%',
  },
  right: {
    '': 'initial',
    '[data-placement="right"]': '100%',
  },
  bottom: {
    '': 'initial',
    '[data-placement="bottom"]': '100%',
  },
  transform: {
    '': 'translate((-.375x - 1px), 0)',
    '[data-placement="bottom"]': 'translate((-.375x - 1px), 0) rotate(180deg)',
    '[data-placement="left"]':
      'translate(-.375x, (-.375x - 1px)) rotate(270deg)',
    '[data-placement="right"]':
      'translate(.375x, (-.375x - 1px)) rotate(90deg)',
  },
}

export interface JengaTooltipProps
  extends BaseProps,
    ContainerStyleProps,
    AriaTooltipProps {
  tipStyles?: Styles
  showIcon?: boolean
  placement?: PlacementAxis
  isMaterial?: boolean
}

function Tooltip(props: JengaTooltipProps, ref) {
  let {
    ref: overlayRef,
    arrowProps,
    state,
    overlayProps,
    minOffset,
    minScale,
    ...tooltipProviderProps
  } = useContext(TooltipContext)

  const defaultRef = useRef<HTMLDivElement>(null)

  overlayRef = overlayRef || defaultRef

  props = mergeProps(props, tooltipProviderProps)

  let {
    placement = 'top',
    isOpen,
    tipStyles,
    showIcon,
    isMaterial,
    ...otherProps
  } = props

  const styles = extractStyles(otherProps, CONTAINER_STYLES, {
    ...TOOLTIP_STYLES,
    pointerEvents: isMaterial ? 'auto' : 'none',
    ...useContextStyles('Tooltip', props),
  })

  tipStyles = {
    ...TIP_STYLES,
    ...useContextStyles('Tooltip_Tip'),
    ...tipStyles,
  }

  const { tooltipProps } = useTooltip(props, state)

  // Sync ref with overlayRef from context.
  useImperativeHandle(ref, () => (overlayRef ? createDOMRef(overlayRef) : null))

  if (typeof minOffset === 'number') {
    minOffset = `${minOffset}px`
  }

  if (typeof minScale === 'number') {
    minScale = String(minScale)
  }

  return (
    <Element
      {...tooltipProps}
      {...overlayProps}
      css={getOverlayTransitionCSS({ placement, minOffset, minScale })}
      styles={styles}
      mods={{
        open: isOpen,
      }}
      data-placement={placement}
      ref={overlayRef}
    >
      {props.children}
      <Element data-placement={placement} styles={tipStyles} {...arrowProps} />
    </Element>
  )
}

/**
 * Display container for Tooltip content. Has a directional arrow dependent on its placement.
 */
const _Tooltip = forwardRef(Tooltip)
export { _Tooltip as Tooltip }
