import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { ClassNameProps } from '@/Models/Props';
import { useState } from 'react';
import { Loader } from '../_Common';
import './styles.scss';

type Props = {} & ClassNameProps;

export const ContentWrapper = ({ className, children }: PropsWithChildren<Props>): React.ReactElement => {
  const [needShowContent, setNeedShowContent] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    setTimeout(() => {
      if (mountedRef.current) {
        setNeedShowContent(true);
      } // if
    }, 500);

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return <div className={`content-wrapper ${className ?? ''}`}>{needShowContent ? children : <Loader />}</div>;
};
