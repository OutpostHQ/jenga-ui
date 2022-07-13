import {
  CONTAINER_STYLES,
  extractStyles,
  filterBaseProps,
  TEXT_STYLES,
} from 'tastycss';
import { useDeprecationWarning } from '../../core/src/_internal';
import { JengaAlertProps } from './types';

const STYLE_LIST = [...CONTAINER_STYLES, ...TEXT_STYLES] as const;

export function useAlert(props: JengaAlertProps) {
  const { type, isDisabled = false, theme } = props;

  const styles = extractStyles(props, STYLE_LIST);

  useDeprecationWarning(typeof type === 'undefined', {
    property: 'type',
    name: 'Alert',
    betterAlternative: 'theme',
  });

  const _theme = isDisabled ? 'disabled' : theme ?? type ?? 'note';

  return {
    styles,
    theme: _theme,
    filteredProps: filterBaseProps(props, { eventProps: true }),
  };
}
