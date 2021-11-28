import React from 'react';

type LineProps = {
  lines?: React.ReactNode;
};

type Props = {
  lines?: string[],
};

const renderLine = (line: string) => {
  return line + '\n';
};

const renderLines = (lines: string[]) => {
  const result = [];

  for (let i = lines.length - 1; i > -1; i -= 1) {
    const line = renderLine(lines[i]);

    result.push(line);
  }

  return result.join('');
};

export const Console:React.FunctionComponent<Props> = ({
 lines = [],
}: Props) => {
  return (
    <textarea value={renderLines(lines)}></textarea>
  );
};
