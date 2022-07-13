import { CSSProperties, forwardRef } from 'react';
import {
  BASE_STYLES,
  BaseProps,
  BaseStyleProps,
  COLOR_STYLES,
  ColorStyleProps,
  extractStyles,
  filterBaseProps,
  ResponsiveStyleValue,
  TagNameProps,
  tasty,
  TEXT_STYLES,
  TextStyleProps,
} from 'tastycss';
import { useSlotProps } from '@jenga-ui/utils';

const STYLE_LIST = [...BASE_STYLES, ...TEXT_STYLES, ...COLOR_STYLES] as const;

export const TEXT_PROP_MAP = {
  transform: 'textTransform',
  weight: 'fontWeight',
  italic: 'fontStyle',
} as const;

export interface JengaTextProps
  extends BaseProps,
    TagNameProps,
    TextStyleProps,
    BaseStyleProps,
    ColorStyleProps {
  /**
   * Whether the text uses the monospace font.
   */
  monospace?: boolean;
  /**
   * Whether the text overflow is ellipsis
   */
  ellipsis?: boolean;
  /**
   * Whether the text is not wrapping
   */
  nowrap?: boolean;
  /**
   * Whether the text has italic style
   */
  italic?: ResponsiveStyleValue<CSSProperties['fontStyle']>;
  weight?: string | number;
  transform?: ResponsiveStyleValue<CSSProperties['textTransform']>;
}

const TextElement = tasty({
  qa: 'Text',
  as: 'span',
  styles: {
    display: {
      '': 'inline',
      ellipsis: 'block',
    },
    margin: '0',
    whiteSpace: {
      '': 'inherit',
      'nowrap | ellipsis': 'nowrap',
    },
    textOverflow: {
      '': false,
      ellipsis: 'ellipsis',
    },
    overflow: {
      '': false,
      ellipsis: 'hidden',
    },
    width: {
      '': false,
      ellipsis: 'max 100%',
    },
  },
});

const _Text = forwardRef(function Text(allProps: JengaTextProps, ref) {
  allProps = useSlotProps(allProps, 'text');

  const { as, qa, block, styleName, ellipsis, nowrap, ...props } = allProps;
  const styles = extractStyles(props, STYLE_LIST, {}, TEXT_PROP_MAP);

  return (
    <TextElement
      as={as || 'span'}
      qa={qa || 'Text'}
      styleName={styleName}
      mods={{
        nowrap,
        ellipsis,
      }}
      block={!!(block || ellipsis)}
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      ref={ref}
    />
  );
});

const Text = Object.assign(_Text, {
  Minor: forwardRef(function MinorText(props: JengaTextProps, ref) {
    return <_Text ref={ref} color="#minor" {...props} />;
  }),
  Danger: forwardRef(function DangerText(props: JengaTextProps, ref) {
    return <_Text role="alert" ref={ref} color="#danger-text" {...props} />;
  }),
  Success: forwardRef(function SuccessText(props: JengaTextProps, ref) {
    return <_Text ref={ref} color="#success-text" {...props} />;
  }),
  Strong: forwardRef(function StrongText(props: JengaTextProps, ref) {
    return (
      <_Text as="strong" preset="strong" ref={ref} color="#dark" {...props} />
    );
  }),
  Emphasis: forwardRef(function EmphasisText(props: JengaTextProps, ref) {
    return <_Text as="em" preset="em" ref={ref} {...props} />;
  }),
  Selection: forwardRef(function SelectionText(props: JengaTextProps, ref) {
    return <_Text ref={ref} color="#dark" fill="#note.30" {...props} />;
  }),
});

export { Text };
