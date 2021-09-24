import React from 'react';
import { ContentWrapper } from '@/Components';
import { ProfileForms, ProfileInfo } from './modules';
import './styles.scss';

type Props = {};

const ProfileComponent = ({}: Props): React.ReactElement => {
  return (
    <ContentWrapper className={'profile-wrapper'}>
      <ProfileInfo />
      <ProfileForms />
    </ContentWrapper>
  );
};

const Profile = React.memo(ProfileComponent);

export default Profile;
