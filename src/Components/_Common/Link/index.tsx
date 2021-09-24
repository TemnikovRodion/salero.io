import React, { PropsWithChildren } from 'react';
import { ClassNameProps } from '@/Models/Props';
import { Link as RouterLink } from 'react-router-dom';
import './styles.scss';

type Props = {
  color?: 'black' | 'blue' | 'gray' | 'red' | 'white';
  weight?: 'normal' | 'medium' | 'bold';
  target?: '_blank';
  location: string;
} & ClassNameProps;

export const Link = ({
  color = 'black',
  weight = 'normal',
  location,
  target,
  className,
  children,
}: PropsWithChildren<Props>): React.ReactElement => {
  return !target ? (
    <RouterLink to={location} className={`text ${color} ${weight} ${className ?? ''}`}>
      {children}
    </RouterLink>
  ) : (
    <a href={location} target={target} className={`text ${color} ${weight} ${className ?? ''}`}>
      {children}
    </a>
  );
};
