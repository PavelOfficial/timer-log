import React from 'react';

import { Timer } from './entity/Timer';
import { ConsolePanelSimple } from './components/ConsolePanelSimple';
import { useConsolePanel } from './hooks/useConsolePanel';

const timers = [
  //
  new Timer(1, 1000),
  new Timer(2, 2000),
  new Timer(3, 3000),
  new Timer(4, 4000),
];

export function ConsolePanel() {
  const { subject, handleClear } = useConsolePanel();

  return (
    <ConsolePanelSimple
      timers={timers}
      subjectConsole={subject.console}
      onClear={handleClear}
      onNewTimer={subject.timeTable.handleNewTimer}
    />
  );
}

export default ConsolePanel;
