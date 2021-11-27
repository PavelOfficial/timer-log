import { useReducer, useEffect } from 'react';

import { IConsoleEmitter } from '../types';

type NewLineAction = {
  type: 'NEW_LINE',
  line: string
}

type ClearAction = {
  type: 'CLEAR'
}

type Action = NewLineAction | ClearAction;

const reducer = (state: string, action: Action) => {
  switch (action.type) {
    case 'NEW_LINE':
      state = action.line + '\n' + state;

      return state;
    case 'CLEAR':
      state = '';

      return state;
    default:
      return state;
  }
};

export const useConsole = (consoleEmitter: IConsoleEmitter) => {
  const [text, dispatch] = useReducer(reducer, '');

  useEffect(() => {
    const handlerNewLine = (line: string) => dispatch({ type: 'NEW_LINE', line })
    const handlerClear = () => dispatch({ type: 'CLEAR' })

    consoleEmitter.on('line', handlerNewLine);
    consoleEmitter.on('clear', handlerClear);

    return () => {
      consoleEmitter.off('line', handlerNewLine);
      consoleEmitter.off('clear', handlerClear);
    };
  }, []);

  return text;
};

export default useConsole;
