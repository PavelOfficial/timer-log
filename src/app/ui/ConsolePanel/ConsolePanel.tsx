import React, { useCallback, useEffect, useState } from 'react';
import { Subject, bindCallback } from 'rxjs';

import './App.css';

import {ActionConsole, ConsoleActionType} from './types';
import { Timer } from '../entity/Timer';
import { ResponsiveConsole } from './ResponsiveConsole';
import { ValueButton } from './ValueButton';
import { TimeTable } from './service/TimeTable';

const timers = [
  new Timer(1000),
  new Timer(2000),
  new Timer(3000),
  new Timer(4000),
];

const consoleSubject = new Subject<ActionConsole>();
const timeTableSubject = new TimeTable();

type NewValueHandler = (timeoutSeconds: number) => void;

const createSubject = () => {
  const console = new Subject<ActionConsole>();
  const timeTable = new TimeTable();
  const subject = {
    console,
    timeTable,
  };

  return subject;
};

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
  const [subject] = useState(createSubject);

  useEffect(() => {
    const subscription = subject.timeTable.subscribe((newLineAction) => {
      subject.console.next(newLineAction);
    });

    const  = (timer, cb) => {
      cb(timer);
      subject.timeTable.next({

      });
    };

    return () => {
      subscription.unsubscribe();
    };
  }, [subject]);

  const handleNewTimer = useCallback((timer) => {
    subject.timeTable.next({

    });
  }, []);

  bindCallback();

  return (
    <div className='App'>
      <div>
        <div>
          {renderTimerButtons(timers, handleNewTimer, 'Таймер')}
        </div>
        <div>
          <button onClick={() => {
            subject.console.next({
              type: ConsoleActionType.CLEAR,
            })
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
