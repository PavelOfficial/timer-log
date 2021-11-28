import React from 'react';

import { Console } from './components/Console';
import { useConsole } from './hooks/useConsole';

type Props = {
  subjectConsole: any
};

export const ResponsiveConsole = ({ subjectConsole }: Props) => {
  const lines = useConsole(subjectConsole);

  return (
    <Console
      lines={lines}
    />
  );
}
