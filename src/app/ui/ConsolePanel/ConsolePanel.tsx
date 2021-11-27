import { Subject } from 'rxjs';

import React, { useEffect, useReducer } from 'react';

import './App.css';
import { ConsolePanel } from './ConsolePanel';

import {ActionConsole} from './types';
import { Timer } from '../entity/Timer';
import {ResponsiveConsole} from "./ResponsiveConsole";
import {ValueButton} from "./ValueButton";

const timers = [
  new Timer(1000),
  new Timer(2000),
  new Timer(3000),
  new Timer(4000),
];

const subject = new Subject<ActionConsole>();

type NewValueHandler = (timeoutSeconds: number) => void;

const renderTimerButtons = (values: Timer[], onNewValue: NewValueHandler, caption: string) => {
  return values.map((value) => {
    return (
      <ValueButton
        key={value.timeout}
        onClick={onNewValue}
        value={value}
        caption={caption}
      />
    )
  });
};

export function ConsolePanel() {

  return (
    <div className="App">
      <div>
        <div>
          {renderTimerButtons(timers, handleNewTimer, 'Таймер')}
        </div>
        <div>
          <button onClick={() => {
            clearTimeout(timoutDescriptor);
            console.current.emit('clear');
          }}>
            Сбросить
          </button>
        </div>
      </div>
      <div>
        Логи
      </div>
      <ResponsiveConsole
        consoleSubject={subject}
      />
    </div>
  );
}

export default ConsolePanel;
