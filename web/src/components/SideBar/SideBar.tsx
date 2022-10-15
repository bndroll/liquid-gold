import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import React, { FC } from 'react';
import LogoMulti from '../../assets/logos/logo-multi.svg';
import { ACCESS_TOKEN } from '../../constants/constants';
import { APP_ROUTES } from '../../constants/routes';
import history from '../../history';

export const SideBar: FC = (): JSX.Element => {
  const onLogoutClick = (): void => {
    localStorage.removeItem(ACCESS_TOKEN);
    history.push(APP_ROUTES.signin.path);
  };

  return (
    <Box
      sx={{
        width: 300,
        height: '100vh',
        backgroundColor: 'secondary.main',
        display: 'flex',
        flexDirection: 'column',
        padding: '26px 10px',
      }}
    >
      <LogoMulti />
      <List>
        <ListItemButton
          sx={{
            borderRadius: '4px',
            marginBottom: '10px',
            '&:hover': { backgroundColor: 'rgba(255,182,53,0.12)' },
          }}
        >
          <ListItemText primary="Создать заявку" sx={{ color: 'white' }} />
        </ListItemButton>
        <ListItemButton
          sx={{
            borderRadius: '4px',
            marginBottom: '10px',
            '&:hover': { backgroundColor: 'rgba(255,182,53,0.12)' },
          }}
        >
          <ListItemText primary="Мои заявки" sx={{ color: 'white' }} />
        </ListItemButton>
        <ListItemButton
          sx={{
            borderRadius: '4px',
            marginBottom: '10px',
            '&:hover': { backgroundColor: 'rgba(255,182,53,0.12)' },
          }}
        >
          <ListItemText primary="Профиль" sx={{ color: 'white' }} />
        </ListItemButton>
        <ListItemButton
          onClick={onLogoutClick}
          sx={{
            borderRadius: '4px',
            '&:hover': { backgroundColor: 'rgba(255,182,53,0.12)' },
          }}
        >
          <ListItemText primary="Выйти" sx={{ color: 'white' }} />
        </ListItemButton>
      </List>
    </Box>
  );
};
