import { JengaTooltipTriggerProps, TooltipTrigger } from './TooltipTrigger';
import { JengaTooltipProps, Tooltip } from './Tooltip';
import { ReactNode, useEffect, useState } from 'react';
import { Styles } from 'tastycss';

export interface JengaTooltipProviderProps
  extends Omit<JengaTooltipTriggerProps, 'children'> {
  children: JengaTooltipTriggerProps['children'][0];
  title?: ReactNode;
  tooltipStyles?: Styles;
  width?: JengaTooltipProps['width'];
}

function TooltipProvider(props: JengaTooltipProviderProps) {
  const [rendered, setRendered] = useState(false);
  const { title, children, tooltipStyles, width, ...otherProps } = props;

  useEffect(() => {
    setRendered(true);
  }, []);

  return rendered ? (
    <TooltipTrigger {...otherProps}>
      {children}
      <Tooltip styles={tooltipStyles} {...(width ? { width } : null)}>
        {title}
      </Tooltip>
    </TooltipTrigger>
  ) : (
    <>children</>
  );
}

let _TooltipProvider = TooltipProvider;
export { _TooltipProvider as TooltipProvider };
