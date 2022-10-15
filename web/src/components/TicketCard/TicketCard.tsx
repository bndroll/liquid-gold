import { Box, Link, Paper } from '@mui/material';
import React, { FC } from 'react';
import { APP_ROUTES } from '../../constants/routes';
import history from '../../history';
import { StateToLabelMap, getPriority } from '../../types/tickets';
import { TTicketCardProps } from './declarations';

export const TicketCard: FC<TTicketCardProps> = ({ ticket }): JSX.Element => {
  const learnMore = (): void => {
    history.push(APP_ROUTES.ticket.path, { ticketId: ticket._id });
  };

  return (
    <Paper sx={{ padding: '10px', height: '100%' }}>
      <Box sx={{ fontWeight: 'bold' }}>{ticket.title}</Box>
      <div>
        <Box sx={{ fontWeight: 'bold', display: 'inline' }}>
          Начало заявки:{' '}
        </Box>
        <span>{new Date(ticket.dateStart).toLocaleString()}</span>
      </div>
      <div>
        <Box sx={{ fontWeight: 'bold', display: 'inline' }}>Конец заявки: </Box>
        <span>{new Date(ticket.dateEnd).toLocaleString()}</span>
      </div>
      <div>
        <Box sx={{ fontWeight: 'bold', display: 'inline' }}>Статус: </Box>
        <span>{StateToLabelMap[ticket.state]}</span>
      </div>
      <Box
        sx={{
          fontWeight: 'bold',
          marginBottom: '20px',
          color: getPriority(ticket.priority).color,
        }}
      >
        {getPriority(ticket.priority).text}
      </Box>
      <Link onClick={learnMore}>Подробнее...</Link>
    </Paper>
  );
};
