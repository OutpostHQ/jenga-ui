import React from 'react';
import { Story } from '@storybook/react';
import { Portal } from '../../src/Portal';
import { PortalProps } from '../../src/types';
import { Divider } from '@jenga-ui/content';

export const Basic: Story<PortalProps> = (args) => (
  <>
    By default, Portal content should be there {' -> '}
    <Portal {...args}>
      Portal's content.
      {!args.isDisabled && " But, if you disable me, I'll be near the arrow"}
    </Portal>
    <Divider />
  </>
);
