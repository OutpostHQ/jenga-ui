import { useState } from 'react';
import { Block, Element, Title } from './index';
import { Button } from '@jenga-ui/button';
// import ResponsiveProvider from './providers/Responsive';
// import { Modal } from './components/organisms/Modal/Modal';
// import { notification } from './services/notification';
import { color } from 'tastycss';
import { Card } from '@jenga-ui/card';
import { Flex, Space, Grid } from '@jenga-ui/layout';
import { Link } from '@jenga-ui/link';
import { Field, Form, useForm } from '@jenga-ui/form';
import { TextInput } from '@jenga-ui/text-input';
import { Provider } from '@jenga-ui/providers';
import { GridProvider } from '@jenga-ui/providers';

// window.notification = notification;
//
// window.Modal = Modal;

function App() {
  const [inProp, setInProp] = useState(false);
  const [form] = useForm();

  return (
    <>
      <Provider>
        <Block padding="2x 20x">
          <GridProvider columns={3} gap="2x">
            <Flex
              flow="row-reverse wrap"
              align="center"
              justify="center"
              gap="2x"
            >
              <Block width="1sp" height="4x" fill="#purple.04" />
              <Block width="2sp" height="4x" fill="#purple.1" />
              <Block width="2sp" height="4x" fill="#purple.1" />
              <Block width="1sp" height="4x" fill="#purple.1" />
              {/*<Block width="1sp" height="4x" fill="#purple.04"></Block>*/}
            </Flex>
          </GridProvider>
          <GridProvider columns={8} gap="3x">
            <Form
              labelPosition="side"
              labelStyles={{ width: '2sp' }}
              form={form}
            >
              <Field
                name="name"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <TextInput label="Your name" />
              </Field>
            </Form>
          </GridProvider>
        </Block>
      </Provider>
      {/*<Modal*/}
      {/*  cancelText="Cancel"*/}
      {/*  okText="Ok"*/}
      {/*  onCancel={() => {}}*/}
      {/*  title="Modal"*/}
      {/*  isVisible={true}*/}
      {/*>*/}
      {/*  Modal content*/}
      {/*</Modal>*/}
      {/*<Modal*/}
      {/*  title="Delete file"*/}
      {/*  icon={<ExclamationCircleOutlined />}*/}
      {/*  visible={inProp}*/}
      {/*  okType="danger"*/}
      {/*  action="Yes"*/}
      {/*  onOk={() => {*/}
      {/*    return new Promise((resolve, reject) => {*/}
      {/*      setTimeout(() => {*/}
      {/*        setInProp(false);*/}
      {/*        resolve();*/}
      {/*      }, 1000);*/}
      {/*    });*/}
      {/*  }}*/}
      {/*  onCancel={() => setInProp(false)}*/}
      {/*>*/}
      {/*  <Block>Do you really want to delete it?</Block>*/}
      {/*  /!*<Space gap="1.5x">*!/*/}
      {/*  /!*  <Button theme="danger">*!/*/}
      {/*  /!*    Delete*!/*/}
      {/*  /!*  </Button>*!/*/}
      {/*  /!*  <Button>*!/*/}
      {/*  /!*    Cancel*!/*/}
      {/*  /!*  </Button>*!/*/}
      {/*  /!*</Space>*!/*/}
      {/*</Modal>*/}
      <Button
        onPress={() => setInProp(!inProp)}
        type="clear"
        styles={{
          transition: 'shadow 0.2s ease-in-out',
          color: {
            '': '#dark.75',
            'hovered, focused, pressed': '#purple-text',
          },
        }}
      >
        Clear
      </Button>
      <Space padding="1x">
        <Button type="primary">Primary</Button>
        <Button type="primary">Other Primary</Button>
        <Button theme="danger">Danger</Button>
        <Button type="clear">Clear</Button>
      </Space>
      <Space padding="1x">
        <Link to="!https://outpost.run">Outpost.run</Link>
      </Space>
      <Provider breakpoints={[1200, 640]}>
        <Flex
          styles={{
            placeContent: ['start', 'center', 'start'],
          }}
          gap={['2x', '4x']}
          flow={['row', 'column', 'row']}
        >
          <button>2</button>
          <button>4</button>
        </Flex>
        <Grid columns="auto 1fr" gap="1x" styles={{ height: '100px' }}>
          <Element styles={{ fill: color('purple', 0.1), width: '200px' }}>
            Without padding
          </Element>
          <Card
            styles={{
              fill: '#purple.50',
              border: true,
              shadow: true,
              padding: '2x',
            }}
          >
            Text
          </Card>
        </Grid>
      </Provider>
    </>
  );
}

export default App;
