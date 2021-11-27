import React from 'react';

import { useConsole } from './useConsole';
import { Console } from './Console';

type Props = {
  consoleSubject: any
};

export const ResponsiveConsole = ({ consoleSubject }: Props) => {
  const lines = useConsole(consoleSubject);

  return (
    <Console
      lines={lines}
    />
  );
}
