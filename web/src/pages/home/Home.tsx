import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SideBar } from '../../components/SideBar';
import { YandexMap } from '../../components/YandexMap';
import { APP_ROUTES } from '../../constants/routes';
import history from '../../history';
import { getAllTransportRequest } from '../../redux/getAllTransport/getAllTransportSlice';
import { selectUser } from '../../redux/getUser/getUserSelectors';
import { Styled } from './styled';

export const Home: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user && user.role === 'Dispatcher') {
      dispatch(getAllTransportRequest());
    } else {
      history.push(APP_ROUTES.createTicketTransport.path);
    }
  }, [user]);

  return (
    <Styled.Wrapper>
      <SideBar />
      <Styled.Content>
        <YandexMap />
      </Styled.Content>
    </Styled.Wrapper>
  );
};
