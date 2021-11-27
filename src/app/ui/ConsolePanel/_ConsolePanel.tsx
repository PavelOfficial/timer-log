import React, { MouseEventHandler } from 'react';

import { ValueButton } from './ValueButton';
import { ConsoleObservable }  from './types';
import { ResponsiveConsole } from './ResponsiveConsole';

type NewValueHandler = (timeoutSeconds: number) => void;

type Props = {
  timers: number[],
  onClear: MouseEventHandler<HTMLButtonElement>,
  onNewTimer: NewValueHandler,
  consoleSubject: ConsoleObservable,
};

const renderTimerButtons = (values: number[], onNewValue: NewValueHandler, caption: string) => {
  return values.map((value) => {
    return (
      <ValueButton
        onClick={onNewValue}
        value={value}
        caption={caption}
      />
    )
  });
};

export const _ConsolePanel = (props: Props) => {
  return (
    <div className="App">
      <div>
        <div>
          {renderTimerButtons(props.timers, props.onNewTimer, 'Таймер')}
        </div>
        <div>
          <button onClick={props.onClear}>
            Сбросить
          </button>
        </div>
      </div>
      <div>
        Логи
      </div>
      <ResponsiveConsole
        consoleSubject={props.consoleSubject}
      />
    </div>
  );
};

