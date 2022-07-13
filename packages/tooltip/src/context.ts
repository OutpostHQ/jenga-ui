import React, { HTMLAttributes, RefObject } from 'react';
import { TooltipTriggerState } from '@react-stately/tooltip';
import { PlacementAxis } from '@jenga-ui/form';
import { Props } from 'tastycss';

interface TooltipContextProps {
  state?: TooltipTriggerState;
  ref?: RefObject<HTMLDivElement>;
  placement?: PlacementAxis;
  arrowProps?: HTMLAttributes<HTMLElement>;
  overlayProps?: Props;
  minScale?: string | number;
  minOffset?: string | number;
  isMaterial?: boolean;
}

export const TooltipContext = React.createContext<TooltipContextProps>({});
