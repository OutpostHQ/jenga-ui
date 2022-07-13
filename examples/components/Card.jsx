import React from 'react';
import { Card as UIKitCard } from '@jenga-ui/card';

export function Card({ styles, ...props }) {
  return (
    <UIKitCard
      styles={{
        textAlign: 'left',
        margin: '0 auto',
        width: ['12sp', , , '2sp'],
        boxSizing: 'border-box',
        padding: ['6x', , , '3x'],
        shadow: '#dark.05 0px 20px 30px 0px',
        fill: '#white',
        radius: '1x',
        border: false,
        ...styles,
      }}
      {...props}
    />
  );
}
