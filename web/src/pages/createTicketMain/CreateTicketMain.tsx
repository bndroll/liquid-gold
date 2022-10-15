import React, { FC } from 'react';
import { SideBar } from '../../components/SideBar';
import { Styled } from './styled';

export const CreateTicketMain: FC = (): JSX.Element => {
  return (
    <Styled.Wrapper>
      <SideBar />
      <Styled.Content>asdasd</Styled.Content>
    </Styled.Wrapper>
  );
};
