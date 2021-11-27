import React, { useEffect, useRef, useReducer, useState } from 'react';
import { Observable, Observer, Subscriber } from 'rxjs';

import './App.css';
import { ConsolePanel } from './components/ConsolePanel';
import { ConsoleEmitter } from './ConsoleEmitter';
import { IConsoleEmitter } from './types';

enum ConsoleActionType {
  CLEAR,
  NEW_LINE,
};

type ActionClear = {
  type: ConsoleActionType.CLEAR,
};

type ActionNewLine = {
  type: ConsoleActionType.NEW_LINE,
  line: string,
};

type ActionConsole = ActionClear | ActionNewLine;

/*

  subscriber.next({
    type: ConsoleActionType.CLEAR,
  });

  subscriber.next({
    type: ConsoleActionType.NEW_LINE,
    line: 'dfgdfsg',
  });

  subscriber.next({
    type: ConsoleActionType.NEW_LINE,
    line: 'dfgdfsg',
  });

 */


type Console = {
  subscriber: Subscriber<ActionConsole>,
  observable: Observable<ActionConsole>,
}

const useConsole = ():Console|null => {
  const [subscriber, setSubscriber] = useState<Subscriber<ActionConsole>|null>(null);
  const [observable, setObservable] = useState<Observable<ActionConsole>|null>(null);

  useEffect(() => {
    const consoleObserver = new Observable<ActionConsole>((subscriber) => {
      setSubscriber(subscriber);
    });

    setObservable(consoleObserver);

    return () => {
      if (subscriber) {
        subscriber.complete();
      }
    };
  }, []);

  if (!subscriber || !observable) {
    return null;
  }

  return {
    subscriber,
    observable,
  };
};

export function ConsolePanelWrapper() {
  const console = useConsole();

  if (!console) {
    return null;
  }

  return (
    <ConsolePanelContainer
      console={console}
    />
  );
}

type Props = {
  console: Console,
};




/*
  var observable = Rx.Observable.create(function subscribe(observer) {
    try {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    } catch (err) {
      observer.error(err); // delivers an error if it caught one
    }
  });

 */

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

export function ConsolePanelContainer(props: Props) {
  const timoutDescriptor = useRef<number>(0);
  const [state, dispatch] = useReducer([], reducer);

  useEffect(() => {
    console.current = (new ConsoleEmitter() as IConsoleEmitter);
  }, []);

  return (
    <ConsolePanel
      timers={[1,2,3,4]}
      onClear={() => {
        clearTimeout(timoutDescriptor);
        console.current.emit('clear')
      }}
      onNewTimer={(timeoutSeconds) => console.current.emit('line')}
      consoleEmitter={console.current}
    />
  );
}

export default ConsolePanelContainer;
