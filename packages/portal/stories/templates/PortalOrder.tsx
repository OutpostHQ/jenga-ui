import { Story } from '@storybook/react';
import { Block } from '@jenga-ui/core';
import { Portal } from '../../src/Portal';
import { PortalProps } from '../../src/types';

export const PortalOrderTemplate: Story<PortalProps> = (args) => (
  <>
    <Portal {...args}>
      <Block>Portal 1</Block>
      <Portal>
        <Block>Portal 3</Block>
      </Portal>
      <Portal>
        <Block>Portal 4</Block>
      </Portal>
    </Portal>
    <Portal>
      <Block>Portal 2</Block>
    </Portal>
  </>
);
