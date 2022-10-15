import { Button } from '@mui/material';
import React, { FC } from 'react';
import { TTransportInfoPopoverProps } from './declarations';
import { Styled } from './styled';

export const TransportInfoPopover: FC<TTransportInfoPopoverProps> = ({
  transport,
}): JSX.Element => {
  return (
    <Styled.Wrapper>
      <div>{transport.description}</div>
      <div>{transport.title}</div>
      <div>{transport.number}</div>
      <div>
        <span>Категория: </span>
        <span>{transport.category}</span>
      </div>
      <Button
        variant="contained"
        size="small"
        sx={{ color: 'white', marginTop: '10px' }}
      >
        Забронировать
      </Button>
    </Styled.Wrapper>
  );
};
