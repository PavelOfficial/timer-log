import { useEffect, useState } from 'react';
import { Observable, Subscriber } from 'rxjs';

import { Console, ConsoleObservable, ConsoleSubscriber, ActionConsole } from './types';

const useConsole = ():Console|null => {
  const [subscriber, setSubscriber] = useState<ConsoleSubscriber|null>(null);
  const [observable, setObservable] = useState<ConsoleObservable|null>(null);

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

export { useConsole };

const defaults = {
  useConsole,
};

export default defaults;
