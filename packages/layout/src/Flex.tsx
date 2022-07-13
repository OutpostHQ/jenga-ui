import { forwardRef } from 'react';
import {
  BaseProps,
  CONTAINER_STYLES,
  ContainerStyleProps,
  extractStyles,
  filterBaseProps,
  tasty,
} from 'tastycss';

const FlexElement = tasty({
  styles: {
    display: 'flex',
    flow: 'row',
  },
});

export interface JengaFlexProps extends BaseProps, ContainerStyleProps {}

export const Flex = forwardRef((props: JengaFlexProps, ref) => {
  const styles = extractStyles(props, CONTAINER_STYLES);

  return (
    <FlexElement
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      ref={ref}
    />
  );
});
