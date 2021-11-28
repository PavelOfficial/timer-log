import React, { FunctionComponent } from 'react';

const noop = (() => {});

type Props = {
  onClick?: (value: any) => void,
  value?: any,
  caption?: string,
  renderCaption?: (value: any, caption: string) => string
}

export const ValueButton:FunctionComponent<Props> = ({
 caption = '',
 value = undefined,
 onClick = noop,
}) => {
  return (
    <button onClick={() => onClick(value)}>
      {`${caption} ${value !== undefined ? String(value) : ''}`}
    </button>
  );
};

ValueButton.displayName = 'ValueButton';

export default ValueButton;
