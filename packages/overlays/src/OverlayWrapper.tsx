import { OverlayTransitionCSSProps } from '@jenga-ui/utils';
import { CSSTransition } from 'react-transition-group';
import { ReactNode, useRef } from 'react';
import { Portal } from '@jenga-ui/portal';

export interface JengaOverlayWrapperProps {
  isOpen?: boolean;
  placement?: 'start' | 'end' | 'right' | 'left' | 'top' | 'bottom';
  children: ReactNode;
  minOffset?: string | number;
  minScale?: string;
  container?: HTMLElement | null;
}

export function OverlayWrapper({
  isOpen,
  placement,
  minOffset,
  minScale,
  children,
  container = null,
}: JengaOverlayWrapperProps) {
  const containerRef = useRef(container);
  const options: OverlayTransitionCSSProps = {};

  if (typeof minOffset === 'number') {
    minOffset = `${minOffset}px`;
  }

  if (placement != null) {
    options.placement = placement;
  }

  if (minScale != null) {
    options.minScale = minScale;
  }

  if (minOffset != null) {
    options.minOffset = minOffset;
  }

  const contents = (
    <CSSTransition
      in={isOpen}
      unmountOnExit
      timeout={180}
      classNames="jenga-overlay-transition"
    >
      {children}
    </CSSTransition>
  );

  return <Portal root={containerRef}>{contents}</Portal>;
}
