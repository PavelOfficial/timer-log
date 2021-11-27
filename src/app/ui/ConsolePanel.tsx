import React, {MouseEventHandler} from 'react';

import { ValueButton } from './ValueButton';
import { Console } from './Console';
import { IConsoleEmitter } from '../types';

type NewValueHandler = (timeoutSeconds: number) => void;

type Props = {
  timers: number[],
  onClear: MouseEventHandler<HTMLButtonElement>,
  onNewTimer: NewValueHandler,
  consoleEmitter: IConsoleEmitter,
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

export const ConsolePanel = (props: Props) => {
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
      <div>Логи</div>
      <Console consoleEmitter={props.consoleEmitter} />
    </div>
  );
};

export default ConsolePanel;
