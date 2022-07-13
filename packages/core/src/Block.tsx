import { forwardRef } from 'react';
import {
  AllBaseProps,
  CONTAINER_STYLES,
  ContainerStyleProps,
  extractStyles,
  filterBaseProps,
  tasty,
} from 'tastycss';

const BlockElement = tasty({
  styled: {
    display: 'block',
  },
});

export interface JengaBlockProps
  extends Omit<AllBaseProps, keyof ContainerStyleProps | 'as'>,
    ContainerStyleProps {}

export const Block = forwardRef((props: JengaBlockProps, ref) => {
  const styles = extractStyles(props, CONTAINER_STYLES);

  return (
    <BlockElement
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      ref={ref}
    />
  );
});
