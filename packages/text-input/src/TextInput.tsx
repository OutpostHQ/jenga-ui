import { ForwardedRef, forwardRef, useRef } from 'react';
import { JengaTextInputBaseProps, TextInputBase } from './TextInputBase';
import { useProviderProps } from '@jenga-ui/providers';
import { useTextField } from '@react-aria/textfield';
import { castNullableStringValue, WithNullableValue } from '@jenga-ui/utils';

export type JengaTextInputProps = WithNullableValue<JengaTextInputBaseProps>;

export const TextInput = forwardRef(function TextInput(
  props: JengaTextInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  castNullableStringValue(props);

  props = useProviderProps(props);

  let inputRef = useRef(null);
  let { labelProps, inputProps } = useTextField(props, inputRef);

  return (
    <TextInputBase
      {...props}
      labelProps={labelProps}
      inputProps={inputProps}
      ref={ref}
      inputRef={inputRef}
    />
  );
});

/**
 * TextInputs are text inputs that allow users to input custom text entries
 * with a keyboard. Various decorations can be displayed around the field to
 * communicate the entry requirements.
 */
(TextInput as any).jengaInputType = 'Text';
