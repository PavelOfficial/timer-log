import React from 'react';
import { Subject } from 'rxjs';

import { Console } from './components/Console';
import { useConsole } from './hooks/useConsole';
import { ActionConsole } from './types';

type Props = {
  subjectConsole: Subject<ActionConsole>;
};




export const ResponsiveConsole = ({ subjectConsole }: Props) => {
  const lines = useConsole(subjectConsole);

  return <Console lines={lines} />;
};
