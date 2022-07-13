import { forwardRef } from 'react';
import {
  BaseProps,
  CONTAINER_STYLES,
  ContainerStyleProps,
  extractStyles,
  filterBaseProps,
  tasty,
  TEXT_STYLES,
  TextStyleProps,
} from 'tastycss';
import { useSlotProps } from '@jenga-ui/utils';

const STYLE_LIST = [...CONTAINER_STYLES, ...TEXT_STYLES];

const FooterElement = tasty({
  qa: 'Footer',
  'data-id': 'Footer',
  styles: {
    gridArea: 'footer',
    display: 'block',
    flow: 'column',
  },
});

export interface JengaFooterProps
  extends BaseProps,
    ContainerStyleProps,
    TextStyleProps {}

export const Footer = forwardRef((props: JengaFooterProps, ref) => {
  props = useSlotProps(props, 'footer');

  const styles = extractStyles(props, STYLE_LIST);

  return (
    <FooterElement
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      ref={ref}
    />
  );
});
