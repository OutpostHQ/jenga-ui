import { forwardRef } from 'react'
import {
  BaseProps,
  CONTAINER_STYLES,
  ContainerStyleProps,
  extractStyles,
  filterBaseProps,
  tasty,
  TEXT_STYLES,
  TextStyleProps,
} from 'tastycss'
import { useSlotProps } from '@jenga-ui/utils'

const STYLE_LIST = [...CONTAINER_STYLES, ...TEXT_STYLES]

const ContentElement = tasty({
  qa: 'Content',
  as: 'section',
  styles: {
    gridArea: 'content',
    preset: 'p3',
    color: '#dark.75',
    display: 'block',
    flow: 'column',
    gap: '2x',
    overflow: 'auto',
    styledScrollbar: true,
  },
})

export interface JengaContentProps
  extends BaseProps,
    ContainerStyleProps,
    TextStyleProps {}

export const Content = forwardRef((props: JengaContentProps, ref) => {
  props = useSlotProps(props, 'content')

  const styles = extractStyles(props, STYLE_LIST)

  return (
    <ContentElement
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      ref={ref}
    />
  )
})
