import React from 'react';

import { IConsoleEmitter } from '../types';
import { useConsole } from '../hooks/useConsole';

type Props = {
  consoleEmitter: IConsoleEmitter,
}

export const Console = (props: Props) => {
  const text = useConsole(props.consoleEmitter);

  return (
    <textarea>
      {text}
    </textarea>
  );
};

export default Console;
