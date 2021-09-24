import React from 'react';
import { Col, Row } from 'antd';
import { Images } from '@/Static';
import { Link, Text, Title } from '@/Components/_Common';
import './styles.scss';

export const LoginInfo = (): React.ReactElement => {
  return (
    <div className={'login-info'}>
      <div className="login-info-app-name">{'Salero.io'}</div>
      <Row justify="center">
        <Col lg={20}>
          <img className="login-info-image" src={Images.Authorization.AuthorizationLogo} alt="" />
          <Title className={'login-info-title'} level={1} color={'white'}>
            {'Добро прожаловать в Salero'}
          </Title>
          <Text className={'login-info-text'} color={'white'}>
            {'Salero - это многофункциональный дашборд для отслеживания показателей торговли на платформе Wildberries'}
          </Text>
        </Col>
      </Row>
      <div className={'login-info-policy'}>
        <Link location={'https://salero.io/agreement/'} target={'_blank'} color={'white'}>
          {'Пользовательское соглашение'}
        </Link>

        <Text color={'white'} className={'login-info-divider'}>
          |
        </Text>

        <Link location={'https://salero.io/privacy/'} target={'_blank'} color={'white'}>
          {'Политика конфиденциальности'}
        </Link>
      </div>
    </div>
  );
};
