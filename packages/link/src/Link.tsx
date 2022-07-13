import { forwardRef } from 'react';
import { Button, JengaButtonProps } from '@jenga-ui/button';
import { FocusableRef } from '@react-types/shared';

export const Link = forwardRef(
  (props: JengaButtonProps, ref: FocusableRef<HTMLElement>) => {
    return <Button type="link" {...props} ref={ref} />;
  },
);
