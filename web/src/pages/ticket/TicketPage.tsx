import { Box, Grid, Paper } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { SideBar } from '../../components/SideBar';
import { YandexMapTicket } from '../../components/YandexMapTicket';
import { selectMyTickets } from '../../redux/ticket/getMyTicketsSelectors';
import { getPriority, StateToLabelMap, TTicket } from '../../types/tickets';
import { Styled } from './styled';

export const TicketPage: FC = (): JSX.Element => {
  const { state } = useLocation<{ ticketId: string }>();
  const tickets = useSelector(selectMyTickets);
  const [currentTicket, setCurrentTicket] = useState<TTicket>();

  useEffect(() => {
    if (tickets.length) {
      const ticket = tickets.find(({ _id }) => _id === state.ticketId);
      setCurrentTicket(ticket);
    }
  }, [tickets]);

  return (
    <Styled.Wrapper>
      <SideBar />
      {currentTicket && (
        <Styled.Content>
          <Box
            sx={{
              fontWeight: 'bold',
              fontSize: 'h4.fontSize',
              marginBottom: '30px',
            }}
          >
            Заявка {currentTicket._id}
          </Box>
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ width: '100%' }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <YandexMapTicket
                    coords={[
                      currentTicket.destination.lat,
                      currentTicket.destination.lon,
                    ]}
                  />
                </Grid>
                <Grid item xs={6} sx={{ height: '100%' }}>
                  <Paper sx={{ padding: '10px' }}>
                    <Box sx={{ fontWeight: 'bold' }}>{currentTicket.title}</Box>
                    <div>
                      <Box sx={{ fontWeight: 'bold', display: 'inline' }}>
                        Начало заявки:{' '}
                      </Box>
                      <span>
                        {new Date(currentTicket.dateStart).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <Box sx={{ fontWeight: 'bold', display: 'inline' }}>
                        Конец заявки:{' '}
                      </Box>
                      <span>
                        {new Date(currentTicket.dateEnd).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <Box sx={{ fontWeight: 'bold', display: 'inline' }}>
                        Статус:{' '}
                      </Box>
                      <span>{StateToLabelMap[currentTicket.state]}</span>
                    </div>
                    <div>
                      <Box sx={{ fontWeight: 'bold', display: 'inline' }}>
                        Описание:{' '}
                      </Box>
                      <span>{currentTicket.description}</span>
                    </div>
                    <Box
                      sx={{
                        fontWeight: 'bold',
                        marginBottom: '20px',
                        color: getPriority(currentTicket.priority).color,
                      }}
                    >
                      {getPriority(currentTicket.priority).text}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Styled.Content>
      )}
    </Styled.Wrapper>
  );
};
