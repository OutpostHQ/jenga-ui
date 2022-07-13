import { tasty } from 'tastycss';
import { Button } from '@jenga-ui/button';

export const StyledButton = tasty(Button, {
  styles: {
    padding: '3x 6x',
    preset: 't1',
  },
});

export const GlobalStyledHeading = tasty('div.myButton', {
  display: 'inline-block',
  padding: '1x 2x',
  preset: 't2',
  border: true,
  radius: true,
  fill: {
    '': '#white',
    ':hover': '#purple.20',
  },
  color: '#dark',
});

export function Block() {
  return (
    <>
      <StyledButton>123</StyledButton>
      <GlobalStyledHeading />
    </>
  );
}
