import { Svg } from '@/Static';
import React from 'react';
import './styles.scss';

type Props = {
  isMenuShown: boolean;
};

export const HeaderLogo = ({ isMenuShown }: Props): React.ReactElement => {
  return (
    <div className={`header-logo ${isMenuShown ? '' : 'header-logo-small'}`}>
      <img src={isMenuShown ? Svg.Logo : Svg.LogoSm} alt={APP_NAME} />
    </div>
  );
};
