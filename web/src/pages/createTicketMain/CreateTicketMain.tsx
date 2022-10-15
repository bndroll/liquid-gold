import { Box, Snackbar } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { MainInfo } from '../../components/MainInfo';
import { SideBar } from '../../components/SideBar';
import { YandexMapCustomer } from '../../components/YandexMapCustomer/YandexMapCustomer';
import { Styled } from './styled';

export const CreateTicketMain: FC = (): JSX.Element => {
  const [isSnackBarOpen, setSnackBarOpen] = useState(false);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    setSnackBarOpen(true);
  }, []);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
  };

  const onChangeCoordinates = (coords: number[]): void => {
    setCoordinates(coords);
  };

  return (
    <Styled.Wrapper>
      <SideBar />
      <Styled.Content>
        <Box
          sx={{
            fontWeight: 'bold',
            fontSize: 'h4.fontSize',
            marginBottom: '30px',
          }}
        >
          Заполните заявку
        </Box>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Box sx={{ width: '800px', marginRight: '20px' }}>
            <YandexMapCustomer onChangeCoordinates={onChangeCoordinates} />
          </Box>
          <MainInfo coords={coordinates} />
        </Box>
      </Styled.Content>
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Для установки точки назначения кликните по карте"
      />
    </Styled.Wrapper>
  );
};
