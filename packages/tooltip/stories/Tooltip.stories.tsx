import { Story, ComponentMeta } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Tooltip } from '../src/Tooltip';
import { Button } from '@jenga-ui/button';
import {
  TooltipTrigger,
  JengaTooltipTriggerProps,
} from '../src/TooltipTrigger';
import {
  JengaTooltipProviderProps,
  TooltipProvider,
} from '../src/TooltipProvider';
import { baseProps } from '../../../stories/lists/baseProps';

export default {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    controls: {
      exclude: baseProps,
    },
  },
} as ComponentMeta<typeof Button>;

const Template: Story<JengaTooltipTriggerProps> = (args) => (
  <TooltipTrigger {...args}>
    <Button>Hover to show a tooltip</Button>
    <Tooltip>Tooltip content</Tooltip>
  </TooltipTrigger>
);

const ViaProviderTemplate: Story<JengaTooltipProviderProps> = (args) => (
  <TooltipProvider title="Tooltip content" {...args}>
    <Button>Hover to show a tooltip</Button>
  </TooltipProvider>
);

export const Default: typeof Template = Template.bind({});
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = await canvas.getByRole('button');
  // this is a weird hack that makes tooltip working properly on page load
  await userEvent.unhover(button);
  await userEvent.hover(button);

  await waitFor(() => expect(canvas.getByRole('tooltip')).toBeInTheDocument());
};

export const ViaProvider: typeof ViaProviderTemplate = ViaProviderTemplate.bind(
  {},
);
ViaProvider.args = {};
ViaProvider.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = await canvas.findByRole('button');
  // this is a weird hack that makes tooltip working properly on page load
  await userEvent.unhover(button);
  await userEvent.hover(button);

  await waitFor(() => expect(canvas.getByRole('tooltip')).toBeInTheDocument());
};

export const ViaProviderWithActiveWrap: typeof ViaProviderTemplate =
  ViaProviderTemplate.bind({});
ViaProviderWithActiveWrap.args = { activeWrap: true };
ViaProviderWithActiveWrap.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = await canvas.findByRole('button');
  // this is a weird hack that makes tooltip working properly on page load
  await userEvent.unhover(button);
  await userEvent.hover(button);

  await waitFor(() => expect(canvas.getByRole('tooltip')).toBeInTheDocument());
};
