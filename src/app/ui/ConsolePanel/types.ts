export enum ConsoleActionType {
  CLEAR,
  NEW_LINE,
};

type ActionClear = {
  type: ConsoleActionType.CLEAR,
};

export type ActionNewLine = {
  type: ConsoleActionType.NEW_LINE,
  line: string,
};

export type ActionConsole = ActionClear | ActionNewLine;
