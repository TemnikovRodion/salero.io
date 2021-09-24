import React from 'react';
import './styles.scss';

type Props = {
  width?: number;
  height?: number;
  color: 'green' | 'blue' | 'orange';
};

export const Square = ({ width = 12, height = 12, color }: Props): React.ReactElement => {
  const colors = {
    green: '#2DD28B',
    blue: '#4385F4',
    orange: '#ffb73d',
  };

  return (
    <div
      style={{
        width: width,
        height: height,
        background: colors[color],
        borderRadius: 2,
        marginRight: 8,
        marginLeft: 8,
      }}
    ></div>
  );
};
