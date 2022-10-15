import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SideBar } from '../../components/SideBar';
import { YandexMap } from '../../components/YandexMap';
import { getAllTransportRequest } from '../../redux/getAllTransport/getAllTransportSlice';
import { Styled } from './styled';

export const Home: FC = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTransportRequest());
  }, []);

  return (
    <Styled.Wrapper>
      <SideBar />
      <Styled.Content>
        <YandexMap />
      </Styled.Content>
    </Styled.Wrapper>
  );
};
