import React, { FunctionComponent } from 'react';

import { noop } from '../utils/function'

type Props = {
  onClick?: (value: any) => void,
  value?: any,
  caption?: string,
  renderCaption?: (value: any, caption: string) => string
}

const defaults = {
  renderCaption: (value: any, caption: string) => {
    return `${caption} ${value !== undefined ? String(value) : ''}`;
  },
};

export const ValueButton:FunctionComponent<Props> = ({
 caption = '',
 value = undefined,
 onClick = noop,
 renderCaption= defaults.renderCaption,
}) => {
  return (
    <button onClick={() => onClick(value)}>
      {renderCaption(caption, value)}
    </button>
  );
};

ValueButton.displayName = 'ValueButton';

export default ValueButton;
