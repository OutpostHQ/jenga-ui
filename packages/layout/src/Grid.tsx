import { forwardRef } from 'react';
import {
  BaseProps,
  CONTAINER_STYLES,
  ContainerStyleProps,
  extractStyles,
  filterBaseProps,
  ShortGridStyles,
  tasty,
} from 'tastycss';

const GridElement = tasty({
  styles: {
    display: 'grid',
    flow: 'row',
  },
});

export interface JengaGridProps
  extends BaseProps,
    ContainerStyleProps,
    ShortGridStyles {}

const PROP_MAP = {
  template: 'gridTemplate',
  columns: 'gridColumns',
  rows: 'gridRows',
  areas: 'gridAreas',
} as const;

export const Grid = forwardRef((props: JengaGridProps, ref) => {
  const styles = extractStyles(props, CONTAINER_STYLES, undefined, PROP_MAP);

  return (
    <GridElement
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      ref={ref}
    />
  );
});
