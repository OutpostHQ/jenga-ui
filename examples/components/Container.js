import React from 'react';
import { Flow } from '@jenga-ui/layout';

export function Container({ styles, ...props }) {
  return (
    <Flow
      styles={{
        textAlign: 'center',
        margin: '0 auto',
        width: ['12sp', , , '2sp'],
        boxSizing: 'border-box',
        gap: '3x',
        ...styles,
      }}
      {...props}
    />
  );
}
