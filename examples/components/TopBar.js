import React from 'react';
import {
  Action,
  Button,
  Dialog,
  DialogTrigger,
  Flex,
  Flow,
  Paragraph,
  Space,
  StyleProvider,
  Text,
} from '@jenga-ui/core';
import { Container } from './Container';

const LOGO = (
  <svg width="99" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26.18 7.038L14.027 0v4.87l12.153 7.007v-4.84z" fill="#FF6492" />
    <path
      d="M26.18 11.877L22.532 14l-8.509-4.919-4.862 2.8-3.646-1.967 8.51-5.044 12.153 7.007z"
      fill="#141446"
    />
    <path d="M9.162 11.881L5.516 9.914V14l3.646-2.119z" fill="#A14474" />
    <path
      d="M1.87 20.962L14.023 14l12.155 6.962L14.024 28 1.87 20.962z"
      fill="#141446"
    />
    <path d="M26.18 16.13L14.025 9.005V14l12.155 6.962V16.13z" fill="#FF6492" />
    <path
      d="M5.516 14V9.914l8.51-5.044V0L1.87 7.038v13.924L14.024 14V9.005L5.516 14z"
      fill="#7A77FF"
    />
    <path
      d="M33.66 15.154c0-4.21 3.339-7.485 7.547-7.485 2.7 0 4.788 1.316 6.008 3.332l-2.148 1.696c-.929-1.316-2.118-2.193-3.83-2.193-2.613 0-4.47 2.046-4.47 4.648 0 2.66 1.857 4.676 4.47 4.676 1.683 0 2.873-.847 3.83-2.163l2.148 1.668c-1.248 2.016-3.339 3.332-6.008 3.332-4.208.002-7.547-3.274-7.547-7.511zM49.855 16.324V7.992h3.019v8.565c0 2.016 1.421 3.273 3.221 3.273 1.742 0 3.136-1.257 3.136-3.273V7.992h3.048v8.332c0 3.888-2.7 6.343-6.182 6.343-3.542 0-6.242-2.455-6.242-6.343zM80.77 15.182c0 4.268-2.932 7.485-6.966 7.485-2.091 0-3.92-.847-4.992-2.309v1.988h-2.845V.42h3.048v9.326c1.075-1.316 2.787-2.075 4.76-2.075 4.063-.002 6.994 3.243 6.994 7.511zm-3.136-.028c0-2.778-1.915-4.677-4.355-4.677-2.147 0-4.296 1.462-4.296 4.707 0 3.273 2.177 4.676 4.296 4.676 2.468 0 4.355-1.929 4.355-4.706zM96.529 16.177H85.906c.407 2.368 2.205 3.77 4.643 3.77 1.655 0 2.96-.643 4.151-1.695l1.452 2.106c-1.51 1.431-3.426 2.309-5.69 2.309-4.411 0-7.663-3.245-7.663-7.485 0-4.21 3.222-7.513 7.373-7.513 3.802 0 6.589 2.806 6.589 6.577 0 .79-.145 1.551-.232 1.931zm-10.565-2.398h7.75c-.058-2.252-1.711-3.509-3.657-3.509-2.004.002-3.63 1.375-4.093 3.509z"
      style={{ fill: 'var(--dark-color)' }}
    />
  </svg>
);

const buttonStyleProvider = ({ type }) => {
  switch (type) {
    case 'clear':
      return {
        size: 't2',
        fill: '#clear',
        border: false,
        color: {
          '': '#dark',
          hovered: '#purple',
        },
      };
    case 'primary':
      return {
        size: 't2',
      };
    default:
      return {};
  }
};

export function TopBar({ styles, ...props }) {
  return (
    <Container
      role="banner"
      styles={{
        padding: '4x 0',
        ...styles,
      }}
      {...props}
    >
      <Space placeContent="space-between" gap="1x">
        <Action to="/">{LOGO}</Action>

        <StyleProvider Button={buttonStyleProvider}>
          <Space>
            <Button type="clear" to="@/docs">
              Docs
            </Button>
            <Button type="clear" to="@/docs">
              Slack
            </Button>
            <DialogTrigger type="popover">
              <Button
                as="div"
                type="clear"
                display="grid"
                placeItems="center stretch"
                flow="column"
              >
                Resources
                <svg
                  fill="currentColor"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g data-name="Layer 2">
                    <g data-name="chevron-down">
                      <rect width="24" height="24" opacity="0"></rect>
                      <path d="M12 15.5a1 1 0 0 1-.71-.29l-4-4a1 1 0 1 1 1.42-1.42L12 13.1l3.3-3.18a1 1 0 1 1 1.38 1.44l-4 3.86a1 1 0 0 1-.68.28z"></path>
                    </g>
                  </g>
                </svg>
              </Button>
              <Dialog display="block">
                <Flex flow="column" groupRadius="2r" width="100%">
                  <Button type="clear" to="@/docs" padding="3x">
                    <Flow gap>
                      <Text
                        display="block"
                        fontWeight={500}
                        color="#dark"
                        preset="p2"
                      >
                        Examples
                      </Text>
                      <Text
                        display="block"
                        color="#minor"
                        fontWeight={400}
                        preset="p2"
                      >
                        See what&apos;s possible with Cube
                      </Text>
                    </Flow>
                  </Button>
                </Flex>
              </Dialog>
            </DialogTrigger>
            <Button type="clear" to="@/docs">
              Cube Cloud
            </Button>
          </Space>
        </StyleProvider>
      </Space>
    </Container>
  );
}
