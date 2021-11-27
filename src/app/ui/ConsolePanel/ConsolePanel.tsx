import { Subject } from 'rxjs';

import React, { useEffect, useRef, useReducer } from 'react';

import './App.css';
import { ConsolePanel } from './components/ConsolePanel';

import {ActionConsole, Console, SubjectConsole} from './types';
import Timer from './entity/Timer';

const reducer = (timers, action) => {
  switch (action.type) {
    case 'NEW_TIMER':
      timers = [
        ...action.timeoutSeconds,
        action.timeoutSeconds,
      ];

      action.timeoutSeconds

      return timers;
    case 'FINISH_TIMER':
      timers.shift();

      return timers;
    default:
      return timers;
  }
};

const timers = [
  new Timer(1000),
  new Timer(2000),
  new Timer(3000),
  new Timer(4000),
];

const subject = new Subject<ActionConsole>();

export function ConsolePanel(props: Props) {
  const timoutDescriptor = useRef<number>(0);
  const [state, dispatch] = useReducer([], reducer);

  useEffect(() => {
    console.current = (new ConsoleEmitter() as IConsoleEmitter);
  }, []);

  return (
    <ConsolePanel
      timers={timers}
      subject={subject}
      onClear={() => {
        clearTimeout(timoutDescriptor);
        console.current.emit('clear');
      }}
      onNewTimer={(timeoutSeconds) => console.current.emit('line')}
    />
  );
}

export default ConsolePanel;
