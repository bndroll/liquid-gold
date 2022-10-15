import { Alert, Box, Button, Paper, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { TypeToLabelMap } from '../FilterPanel/declarations';
import { TTransportCardProps } from './declarations';

export const TransportCard: FC<TTransportCardProps> = ({
  transport,
}): JSX.Element => {
  const theme = useTheme();

  return (
    <Paper sx={{ padding: '10px', height: '100%' }}>
      <div>
        <Box sx={{ fontWeight: 'bold', display: 'inline' }}>Парк: </Box>
        <span>{TypeToLabelMap[transport.type]}</span>
      </div>
      <div>
        <Box sx={{ fontWeight: 'bold', display: 'inline' }}>Описание: </Box>
        <span>{transport.description}</span>
      </div>
      <div>
        <Box sx={{ fontWeight: 'bold', display: 'inline' }}>Название: </Box>
        <span>{transport.title}</span>
      </div>
      <div>
        <Box sx={{ fontWeight: 'bold', display: 'inline' }}>Номер: </Box>
        <span>{transport.number}</span>
      </div>
      <div>
        <Box sx={{ fontWeight: 'bold', display: 'inline' }}>Категория: </Box>
        <span>{transport.category}</span>
      </div>
      {transport.isFree ? (
        <Box sx={{ color: theme.palette.success.main }}>
          Транспорт сейчас свободен
        </Box>
      ) : (
        <Box sx={{ color: theme.palette.error.main }}>
          Транспорт сейчас занят
        </Box>
      )}
      <Button
        sx={{ marginTop: '20px', color: 'white' }}
        variant="contained"
        size="small"
      >
        Выбрать
      </Button>
    </Paper>
  );
};
