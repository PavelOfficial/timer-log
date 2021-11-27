import { useReducer, useEffect } from 'react';

import {
  ConsoleObservable,
  ActionConsole,
  ConsoleActionType,
} from '../../ui/types';

const reducer = (lines: string[], action: ActionConsole) => {
  switch (action.type) {
    case ConsoleActionType.NEW_LINE:
      lines.push(action.line);

      return lines;
    case ConsoleActionType.CLEAR:
      lines = [];

      return lines;
    default:
      return lines;
  }
};

export const useConsole = (subject: ConsoleObservable) => {
  const [lines, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const subscription = subject.subscribe(dispatch);
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return lines;
};

export default useConsole;
