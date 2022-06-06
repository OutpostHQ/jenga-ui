import {
  CheckOutlined,
  LoadingOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import { mergeProps } from '@react-aria/utils'
import { cloneElement, forwardRef, RefObject, useState } from 'react'
import { useComboBoxState } from '@react-stately/combobox'
import { useComboBox } from '@react-aria/combobox'
import { useButton } from '@react-aria/button'
import { useFormProps, FieldWrapper } from '@jenga-ui/form'
import { useHover } from '@react-aria/interactions'
import { useProviderProps } from '@jenga-ui/providers'
import { useFilter } from '@react-aria/i18n'
import { BLOCK_STYLES, extractStyles, OUTER_STYLES, tasty } from 'tastycss'
import { useFocus, modAttrs, useCombinedRefs } from '@jenga-ui/utils'
import { JengaSelectBaseProps, ListBoxPopup } from '@jenga-ui/select'
import { Prefix, Suffix, Space } from '@jenga-ui/layout'
import { Item } from '@react-stately/collections'
import { DEFAULT_INPUT_STYLES } from '@jenga-ui/text-input'
import { useOverlayPosition } from '@react-aria/overlays'
import { OverlayWrapper } from '@jenga-ui/overlays'
import type {
  CollectionBase,
  KeyboardDelegate,
  LoadingState,
} from '@react-types/shared'
import type { ComboBoxProps } from '@react-types/combobox'

const CaretDownIcon = () => (
  <svg
    aria-hidden="true"
    width="14"
    height="14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.49 4.102H2.51c-.269 0-.42.284-.253.478l4.49 5.206a.342.342 0 00.506 0l4.49-5.206c.167-.194.016-.478-.253-.478z"
      fill="currentColor"
    />
  </svg>
)

const ComboBoxWrapperElement = tasty({
  styles: {
    position: 'relative',
    display: 'grid',
    zIndex: {
      '': 'initial',
      focused: 1,
    },
  },
})

const InputElement = tasty({
  as: 'input',
  styles: {
    ...DEFAULT_INPUT_STYLES,
    width: '100%',
  },
})

const TriggerElement = tasty({
  as: 'button',
  styles: {
    display: 'grid',
    placeItems: 'center',
    placeContent: 'center',
    placeSelf: 'stretch',
    radius: 'right',
    padding: '0 1x',
    color: 'inherit',
    border: 0,
    reset: 'button',
    margin: 0,
    fill: {
      '': '#purple.0',
      hovered: '#dark.04',
      pressed: '#dark.08',
      disabled: '#clear',
    },
    cursor: 'pointer',
  },
})

export interface JengaComboBoxProps<T>
  extends Omit<JengaSelectBaseProps<T>, 'onOpenChange'>,
    ComboBoxProps<T>,
    CollectionBase<T> {
  multiLine?: boolean
  autoComplete?: string
  inputRef?: RefObject<HTMLInputElement>
  /** The ref for the list box popover. */
  popoverRef?: RefObject<HTMLDivElement>
  /** The ref for the list box. */
  listBoxRef?: RefObject<HTMLElement>
  /** An optional keyboard delegate implementation, to override the default. */
  keyboardDelegate?: KeyboardDelegate
  loadingState?: LoadingState
  filter?: (val: any, str: string) => boolean
  size?: 'small' | 'default' | 'large' | string
}

function ComboBox<T extends object>(props: JengaComboBoxProps<T>, ref) {
  props = useProviderProps(props)
  props = useFormProps(props)

  let {
    qa,
    label,
    extra,
    labelPosition = 'top',
    labelStyles,
    isRequired,
    necessityIndicator,
    validationState,
    prefix,
    isDisabled,
    multiLine,
    autoFocus,
    inputRef,
    triggerRef,
    popoverRef,
    listBoxRef,
    isLoading,
    loadingIndicator,
    overlayOffset = 8,
    inputStyles,
    optionStyles,
    triggerStyles,
    suffix,
    listBoxStyles,
    overlayStyles,
    hideTrigger,
    message,
    description,
    size,
    autoComplete = 'off',
    direction = 'bottom',
    shouldFlip = true,
    requiredMark = true,
    menuTrigger = 'input',
    loadingState,
    filter,
    styles,
    ...otherProps
  } = props
  let isAsync = loadingState != null
  let { contains } = useFilter({ sensitivity: 'base' })
  let [suffixWidth, setSuffixWidth] = useState(0)
  let [prefixWidth, setPrefixWidth] = useState(0)
  let state = useComboBoxState({
    ...props,
    defaultFilter: filter || contains,
    allowsEmptyCollection: isAsync,
  })

  const outerStyles = extractStyles(otherProps, OUTER_STYLES, styles)

  inputStyles = extractStyles(otherProps, BLOCK_STYLES, inputStyles)

  ref = useCombinedRefs(ref)
  inputRef = useCombinedRefs(inputRef)
  triggerRef = useCombinedRefs(triggerRef)
  popoverRef = useCombinedRefs(popoverRef)
  listBoxRef = useCombinedRefs(listBoxRef)

  let {
    labelProps,
    inputProps,
    listBoxProps,
    buttonProps: triggerProps,
  } = useComboBox(
    {
      ...props,
      inputRef,
      buttonRef: triggerRef,
      listBoxRef,
      popoverRef,
      menuTrigger,
    },
    state
  )

  let { overlayProps, placement } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef: popoverRef,
    scrollRef: listBoxRef,
    placement: `${direction} end`,
    shouldFlip: shouldFlip,
    isOpen: state.isOpen,
    onClose: state.close,
    offset: overlayOffset,
  })

  if (prefix) {
    inputStyles.paddingLeft = `${prefixWidth}px`
  }

  inputStyles.paddingRight = `${suffixWidth}px`

  let { isFocused, focusProps } = useFocus({ isDisabled })
  let { hoverProps, isHovered } = useHover({ isDisabled })

  // Get props for the button based on the trigger props from useComboBox
  let { buttonProps, isPressed: isTriggerPressed } = useButton(
    triggerProps,
    triggerRef
  )
  let { hoverProps: triggerHoverProps, isHovered: isTriggerHovered } = useHover(
    { isDisabled }
  )
  let { focusProps: triggerFocusProps, isFocused: isTriggerFocused } = useFocus(
    { isDisabled },
    true
  )

  let isInvalid = validationState === 'invalid'

  let validationIcon = isInvalid ? (
    <WarningOutlined style={{ color: 'var(--danger-color)' }} />
  ) : (
    <CheckOutlined style={{ color: 'var(--success-color)' }} />
  )
  let validation = cloneElement(validationIcon)

  let comboBoxWidth = inputRef?.current?.offsetWidth

  let comboBoxField = (
    <ComboBoxWrapperElement
      ref={ref}
      qa={qa || 'ComboBox'}
      {...modAttrs({
        invalid: isInvalid,
        valid: validationState === 'valid',
        disabled: isDisabled,
        hovered: isHovered,
        focused: isFocused,
      })}
      styles={outerStyles}
      style={{
        zIndex: isFocused ? 1 : 'initial',
      }}
      data-size={size}
    >
      <InputElement
        qa="Input"
        {...mergeProps(inputProps, hoverProps, focusProps)}
        ref={inputRef}
        autoComplete={autoComplete}
        styles={inputStyles}
        {...modAttrs({
          invalid: isInvalid,
          valid: validationState === 'valid',
          disabled: isDisabled,
          hovered: isHovered,
          focused: isFocused,
        })}
        data-size={size}
      />
      {prefix ? (
        <Prefix
          onWidthChange={setPrefixWidth}
          padding="0 1x 0 1.5x"
          opacity={isDisabled ? '@disabled-opacity' : false}
          placeItems="center"
          outerGap={0}
        >
          {prefix}
        </Prefix>
      ) : null}
      <Suffix
        onWidthChange={setSuffixWidth}
        opacity={isDisabled ? '@disabled-opacity' : false}
      >
        {validationState || isLoading ? (
          <Space gap={false} padding="0 1x">
            {validationState && !isLoading ? validation : null}
            {isLoading && <LoadingOutlined />}
          </Space>
        ) : null}
        {suffix}
        {!hideTrigger ? (
          <TriggerElement
            {...mergeProps(buttonProps, triggerFocusProps, triggerHoverProps)}
            {...modAttrs({
              pressed: isTriggerPressed,
              focused: isTriggerFocused,
              hovered: isTriggerHovered,
              disabled: isDisabled,
            })}
            data-size={size}
            isDisabled={isDisabled}
            ref={triggerRef}
            styles={triggerStyles}
          >
            <CaretDownIcon />
          </TriggerElement>
        ) : null}
      </Suffix>
      <OverlayWrapper isOpen={state.isOpen && !isDisabled}>
        <ListBoxPopup
          {...listBoxProps}
          listBoxRef={listBoxRef}
          popoverRef={popoverRef}
          overlayProps={overlayProps}
          shouldUseVirtualFocus
          placement={placement}
          state={state}
          listBoxStyles={listBoxStyles}
          overlayStyles={overlayStyles}
          optionStyles={optionStyles}
          minWidth={comboBoxWidth}
        />
      </OverlayWrapper>
    </ComboBoxWrapperElement>
  )

  return (
    <FieldWrapper
      {...{
        labelPosition,
        label,
        extra,
        styles,
        isRequired,
        labelStyles,
        necessityIndicator,
        labelProps,
        isDisabled,
        validationState,
        message,
        description,
        requiredMark,
        Component: comboBoxField,
        ref: ref,
      }}
    />
  )
}

const _ComboBox = forwardRef(ComboBox)

const __ComboBox = Object.assign(
  _ComboBox as typeof _ComboBox & { Item: typeof Item },
  { Item }
)
;(__ComboBox as any).jengaInputType = 'ComboBox'

export { __ComboBox as ComboBox }
