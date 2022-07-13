import { Link } from '../src/Link';
import { baseProps } from '../../../stories/lists/baseProps';

export default {
  title: 'Navigation/Link',
  component: Link,
  parameters: {
    controls: {
      exclude: baseProps,
    },
  },
  argTypes: {
    label: {
      defaultValue: 'Button',
      control: 'text',
    },
  },
};

const Template = ({ isDisabled, label }) => (
  <Link
    isDisabled={isDisabled}
    onPress={() => console.log('Press')}
    to="!https://outpost.run"
  >
    {label}
  </Link>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Link',
};
