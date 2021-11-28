import React from 'react';
import { Subject } from 'rxjs';

import { ResponsiveConsole } from '../ResponsiveConsole';
import { Timer } from '../entity/Timer';
import { ValueButton } from './ValueButton';
import { ActionConsole } from "../types";

type NewValueHandler = (timer: Timer) => void;

type Props = {
  timers: Timer[],
  onNewTimer: (timer: Timer) => void,
  subjectConsole: Subject<ActionConsole>,
  onClear: () => void,
};

const renderTimerButtons = (values: Timer[], onNewValue: NewValueHandler, caption: string) => {
  return values.map((value) => {
    return (
      <ValueButton
        key={value.id}
        onClick={onNewValue}
        value={value}
        caption={caption}
      />
    )
  });
};

export const ConsolePanelSimple = (props: Props) => {
  return (
    <div className='App'>
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
        subjectConsole={props.subjectConsole}
      />
    </div>
  );
};
