import { Button } from '@mui/material';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { APP_ROUTES } from '../../constants/routes';
import history from '../../history';
import { setSelectedTransport } from '../../redux/selectedTransport/selectedTransportSlice';
import { TTransportInfoPopoverProps } from './declarations';
import { Styled } from './styled';

export const TransportInfoPopover: FC<TTransportInfoPopoverProps> = ({
  transport,
}): JSX.Element => {
  const dispatch = useDispatch();

  const handleReserveClick = (): void => {
    history.push(APP_ROUTES.createTicketMain.path);
    dispatch(setSelectedTransport(transport));
  };

  return (
    <Styled.Wrapper>
      <div>{transport.description}</div>
      <div>{transport.title}</div>
      <div>{transport.number}</div>
      <div>
        <span>Категория: </span>
        <span>{transport.category}</span>
      </div>
    </Styled.Wrapper>
  );
};
