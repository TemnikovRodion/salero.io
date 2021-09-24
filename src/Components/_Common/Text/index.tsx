import React, { PropsWithChildren } from 'react';
import { ClassNameProps } from '@/Models/Props';
import './styles.scss';

type Props = {
  color?: 'black' | 'blue' | 'gray' | 'red' | 'white';
  weight?: 'normal' | 'medium' | 'bold';
  onClick?: () => void;
} & ClassNameProps;

export const Text = ({
  color = 'black',
  weight = 'normal',
  onClick = () => null,
  children,
  className,
}: PropsWithChildren<Props>): React.ReactElement => {
  return (
    <span className={`text ${color} ${weight} ${className ?? ''}`} onClick={onClick}>
      {children}
    </span>
  );
};
