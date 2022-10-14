import { Box, TextField, useTheme } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectAuthLoading } from '../../redux/auth/authSelectors';
import { authRequest } from '../../redux/auth/authSlice';
import { Styled } from './styled';

export const Signin: FC = (): JSX.Element => {
  const isAuthLoading = useSelector(selectAuthLoading);
  const theme = useTheme();

  const { control, getValues } = useForm({
    defaultValues: {
      userName: '',
      password: '',
    },
  });

  const dispatch = useDispatch();

  const onClick = (): void => {
    dispatch(
      authRequest({
        username: getValues('userName'),
        password: getValues('password'),
      })
    );
  };

  return (
    <>
      <Styled.Container>
        <form>
          <Styled.FormContainer spacing={2}>
            <Box sx={{ fontWeight: 'bold', fontSize: 'h4.fontSize' }}>Вход</Box>
            <Controller
              name="userName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Имя пользователя"
                  color="secondary"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  color="secondary"
                  label="Пароль"
                />
              )}
            />
            <LoadingButton
              style={{
                backgroundColor: theme.palette.primary.dark,
                color: 'white',
              }}
              onClick={onClick}
              variant="contained"
              loading={isAuthLoading}
              size="large"
            >
              Войти
            </LoadingButton>
          </Styled.FormContainer>
        </form>
      </Styled.Container>
    </>
  );
};
