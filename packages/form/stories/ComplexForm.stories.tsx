import { StoryFn } from '@storybook/react';
import { Item } from '@react-stately/collections';
import { Block } from '@jenga-ui/core';
import { TextInput } from '@jenga-ui/text-input';
import { Switch } from '@jenga-ui/switch';
import { Form, Field } from '@jenga-ui/form';
import { PasswordInput } from '@jenga-ui/password-input';
import { Checkbox, CheckboxGroup } from '@jenga-ui/checkbox';
import { NumberInput } from '@jenga-ui/number-input';
import { Radio } from '@jenga-ui/radio';
import { Select } from '@jenga-ui/select';
import { ComboBox } from '@jenga-ui/combo-box';
import { baseProps } from '../../../stories/lists/baseProps';
import { Button, Submit } from '@jenga-ui/button';
import { linkTo } from '@storybook/addon-links';

export default {
  title: 'Forms/ComplexForm',
  component: Form,
  parameters: { controls: { exclude: baseProps } },
};

const Template: StoryFn<typeof Form> = (args) => {
  const [form] = Form.useForm();

  return (
    <>
      <Field label="Custom field outside the any form" tooltip="What?">
        <Block>Some non-editable content</Block>
      </Field>
      <Form
        form={form}
        {...args}
        onSubmit={(v) => {
          console.log('onSubmit:', v);
        }}
        onValuesChange={(v) => {
          console.log('onChange', v);
        }}
        defaultValues={{
          text: 'some',
          checkbox: true,
          select: {
            one: 'three',
          },
          combobox: 'two',
          checkboxGroup: ['one', 'three'],
          radioGroup: 'three',
          switch: false,
        }}
      >
        <Field
          name="text"
          validateTrigger="onChange"
          rules={[
            { required: true, message: 'This field is required' },
            () => ({
              validator(rule, value) {
                return value.length >= 8
                  ? Promise.resolve()
                  : Promise.reject(
                      'This field should be at least 8 symbols long',
                    );
              },
            }),
          ]}
        >
          <TextInput label="Text field" />
        </Field>
        <Field label="Custom field" tooltip="What?">
          <Block>Test</Block>
        </Field>
        <Field
          name="email"
          rules={[
            { required: true, message: 'This field is required' },
            {
              type: 'email',
              message: 'This field should be a valid email address',
            },
          ]}
          necessityIndicator={'label'}
          defaultValue="tenphi@gmail.com"
          shouldUpdate={({ email }) => {
            return !!email;
          }}
        >
          <TextInput type="email" label="Email field" />
        </Field>
        <Field name="password">
          <PasswordInput label="Password field" />
        </Field>
        <Field
          name={['select', 'one']}
          label="Select field"
          tooltip="Additional field description"
        >
          <Select>
            <Item key="one">One</Item>
            <Item key="two">Two</Item>
            <Item key="three">Three</Item>
          </Select>
        </Field>
        <Field name="combobox" label="ComboBox field">
          <ComboBox>
            <Item key="one">One</Item>
            <Item key="two">Two</Item>
            <Item key="three">Three</Item>
          </ComboBox>
        </Field>
        <Field
          name="checkboxGroup"
          label="Checkbox group"
          rules={[
            {
              required: true,
              message: 'Specify at least a single option',
            },
          ]}
        >
          <CheckboxGroup orientation="horizontal">
            <Checkbox value="one">One</Checkbox>
            <Checkbox value="two">Two</Checkbox>
            <Checkbox value="three">Three</Checkbox>
          </CheckboxGroup>
        </Field>
        <Field name="radioGroup" label="Radio group">
          <Radio.Group>
            <Radio value="one">One</Radio>
            <Radio value="two">Two</Radio>
            <Radio value="three">Three</Radio>
          </Radio.Group>
        </Field>
        <Field
          name="checkbox"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Checkbox label="Checkbox field" />
        </Field>
        <Field
          name="switch"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Switch label="Switch field" />
        </Field>
        <Field
          name="number"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <NumberInput label="Number field" minValue={-1} />
        </Field>
        <Submit>Submit</Submit>
      </Form>
    </>
  );
};

export const FormInsideDialog: StoryFn = () => {
  return (
    <Button onPress={linkTo('Overlays/DialogForm')}>
      Moved to a Dialog Form Page
    </Button>
  );
};

export const Default = Template.bind({});
