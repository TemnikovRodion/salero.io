import React from 'react';
import { Modal as ModalWindow } from 'antd';
import { Title } from '../_Common';
import { Images } from '@/Static';
import './styles.scss';

type Props = {
  title: string;
  visible: boolean;
  width?: number;
  body?: JSX.Element;
  buttons?: JSX.Element;
  onCancel?: () => void;
};

export const Modal = ({ title, visible, width, body, buttons, onCancel }: Props): React.ReactElement => {
  return (
    <ModalWindow
      width={width}
      centered
      visible={visible}
      closable={Boolean(onCancel)}
      onCancel={onCancel}
      footer={false}
    >
      <div className={'modal-body'}>
        <div className={'modal-body-content'}>
          <Title level={4} className={'modal-body-content-title'}>
            {title}
          </Title>
          {body}

          {buttons && <div className={'modal-body-content-buttons'}>{buttons}</div>}
        </div>

        <div className={'modal-body-image'}>
          <img alt={'modal-image'} src={Images.Modal.BodyImage} />
        </div>
      </div>
    </ModalWindow>
  );
};
