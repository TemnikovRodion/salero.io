import React, { PropsWithChildren } from 'react';
import { ClassNameProps } from '@/Models/Props';
import './styles.scss';

type Props = {
  color?: 'black' | 'blue' | 'gray' | 'red' | 'white';
  weight?: 'medium' | 'bold';
  level: 1 | 2 | 3 | 4 | 5;
} & ClassNameProps;

export const Title = ({
  color = 'black',
  weight = 'medium',
  level,
  className,
  children,
}: PropsWithChildren<Props>): React.ReactElement => {
  const getTitleTag = (level: 1 | 2 | 3 | 4 | 5, className: string): JSX.Element => {
    switch (level) {
      case 1:
        return <h1 className={className}>{children}</h1>;

      case 2:
        return <h2 className={className}>{children}</h2>;

      case 3:
        return <h3 className={className}>{children}</h3>;

      case 4:
        return <h4 className={className}>{children}</h4>;

      case 5:
        return <h5 className={className}>{children}</h5>;
    }
  };

  return getTitleTag(level, `title ${weight} ${color} ${className ?? ''}`);
};
