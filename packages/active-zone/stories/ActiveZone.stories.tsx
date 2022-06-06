import { ActiveZone } from '../src/ActiveZone'
import { TooltipTrigger, Tooltip } from '@jenga-ui/tooltip'
import { baseProps } from '../../../stories/lists/baseProps'

export default {
  title: 'Content/ActiveZone',
  component: ActiveZone,
  parameters: {
    controls: {
      exclude: baseProps,
    },
  },
}

const Template = ({ isDisabled, label }) => (
  <ActiveZone isDisabled={isDisabled}>{label}</ActiveZone>
)

const TooltipTemplate = ({ isDisabled, label }) => (
  <TooltipTrigger>
    <ActiveZone isDisabled={isDisabled}>{label}</ActiveZone>
    <Tooltip>Tooltip</Tooltip>
  </TooltipTrigger>
)

export const Default = Template.bind({})
Default.args = {
  label: 'ActiveZone',
}

export const WithTooltip = TooltipTemplate.bind({})
WithTooltip.args = {
  label: 'ActiveZone',
}
