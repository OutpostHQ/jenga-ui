import { ForwardedRef, forwardRef } from 'react';
import { TextInput } from '@jenga-ui/text-input';
import { PasswordInput } from '@jenga-ui/password-input';
import { NumberInput } from '@jenga-ui/number-input';
import { FileInput } from '@jenga-ui/file-input';
import { TextArea } from '@jenga-ui/textarea';

type JengaInput = typeof TextInput & {
  Text: typeof TextInput;
  Password: typeof PasswordInput;
  Number: typeof NumberInput;
  TextArea: typeof TextArea;
  File: typeof FileInput;
};

export const Input: JengaInput = Object.assign(
  forwardRef(function Input(props, ref: ForwardedRef<HTMLInputElement>) {
    return <TextInput ref={ref} {...props} />;
  }),
  {
    Text: TextInput,
    Password: PasswordInput,
    Number: NumberInput,
    TextArea: TextArea,
    File: FileInput,
  },
);
