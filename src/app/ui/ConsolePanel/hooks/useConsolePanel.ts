import { useCallback, useEffect, useState } from 'react';
import { Subject } from 'rxjs';

import { ActionConsole, ConsoleActionType } from '../types';

import { TimeTable } from '../service/TimeTable';

const createSubject = () => {
  const console = new Subject<ActionConsole>();
  const timeTable = new TimeTable();
  const subject = {
    console,
    timeTable,
  };

  return subject;
};

export const useConsolePanel = () => {
  const [subject, setSubject] = useState(createSubject);

  useEffect(() => {
    const subscription = subject.timeTable.subject.subscribe((newLineAction) => {
      subject.console.next(newLineAction);
    });

    subject.console.next({
      type: ConsoleActionType.CLEAR,
    });

    return () => {
      subject.timeTable.complete();
      subscription.unsubscribe();
    };
  }, [subject]);

  const handleClear = useCallback(() => {
    setSubject(createSubject());
  }, [setSubject]);

  return {
    subject,
    handleClear,
  };
};
