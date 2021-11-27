import React, { MouseEventHandler } from 'react';

import { ValueButton } from './ValueButton';
import { ConsoleObservable }  from './types';
import { ResponsiveConsole } from './ResponsiveConsole';
import { Timer } from '../entity/Timer';





type Props = {
  timers: Timer[],
  onClear: MouseEventHandler<HTMLButtonElement>,
  onNewTimer: NewValueHandler,
  subject: ConsoleObservable,
};

export const renderConsolePanel = (props: Props) => {

};

