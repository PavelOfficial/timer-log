import { Subject } from 'rxjs';

export enum ConsoleActionType {
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

export type ActionConsole = ActionClear | ActionNewLine;
export type SubjectConsole = Subject<ActionConsole>;
