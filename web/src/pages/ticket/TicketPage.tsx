import { Box, Button, Grid, Paper } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { SideBar } from '../../components/SideBar';
import { YandexMapTicket } from '../../components/YandexMapTicket';
import { selectTransportById } from '../../redux/getAllTransport/getTransportByIdSelectors';
import {
  getTransportByIdRequest,
  resetTransportById,
} from '../../redux/getAllTransport/getTransportByIdSlice';
import { selectUserById } from '../../redux/getUser/getUserByIdSelectors';
import {
  getUserByIdRequest,
  resetUserById,
} from '../../redux/getUser/getUserByIdSlice';
import { selectUser } from '../../redux/getUser/getUserSelectors';
import { closeTicketRequest } from '../../redux/ticket/closeTicketSlice';
import { selectMyTickets } from '../../redux/ticket/getMyTicketsSelectors';
import { getPriority, StateToLabelMap, TTicket } from '../../types/tickets';
import { Styled } from './styled';

export const TicketPage: FC = (): JSX.Element => {
  const { state } = useLocation<{ ticketId: string }>();
  const tickets = useSelector(selectMyTickets);
  const [currentTicket, setCurrentTicket] = useState<TTicket>();
  const driver = useSelector(selectUserById);
  const transport = useSelector(selectTransportById);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    if (tickets.length) {
      console.log(tickets);
      const ticket = tickets.find(({ _id }) => _id === state.ticketId);
      setCurrentTicket(ticket);
    }
  }, [tickets]);

  useEffect(() => {
    if (currentTicket) {
      dispatch(getUserByIdRequest({ id: currentTicket.driver }));
      dispatch(getTransportByIdRequest({ id: currentTicket.transport }));
    }
  }, [currentTicket]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(resetUserById());
  //     dispatch(resetTransportById());
  //   };
  // });

  const handleTicketCancel = (): void => {
    dispatch(closeTicketRequest({ id: currentTicket._id }));
  };

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
                  <Paper sx={{ padding: '10px', height: '282px' }}>
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
                {transport && (
                  <Grid item xs={6} sx={{ height: '100%' }}>
                    <Paper sx={{ padding: '10px', height: '123px' }}>
                      <Box sx={{ fontWeight: 'bold', fontSize: 'h5.fontSize' }}>
                        Транспорт
                      </Box>
                      <div>
                        <Box sx={{ fontWeight: 'bold', display: 'inline' }}>
                          Описание:
                        </Box>
                        <span>{transport.description}</span>
                      </div>
                      <div>
                        <Box sx={{ fontWeight: 'bold', display: 'inline' }}>
                          Наименование:
                        </Box>
                        <span>{transport.title}</span>
                      </div>
                      <div>
                        <Box sx={{ fontWeight: 'bold', display: 'inline' }}>
                          Номер:
                        </Box>
                        <span>{transport.number}</span>
                      </div>
                    </Paper>
                  </Grid>
                )}
                {driver ? (
                  <Grid item xs={6} sx={{ height: '100%' }}>
                    <Paper sx={{ padding: '10px', height: '123px' }}>
                      <Box sx={{ fontWeight: 'bold', fontSize: 'h5.fontSize' }}>
                        Исполнитель
                      </Box>
                      <div>
                        <Box sx={{ fontWeight: 'bold', display: 'inline' }}>
                          ФИО:
                        </Box>
                        <span>{driver.fio}</span>
                      </div>
                      <div>
                        <Box sx={{ fontWeight: 'bold', display: 'inline' }}>
                          Рейтинг:
                        </Box>
                        <span>{driver.rating}</span>
                      </div>
                    </Paper>
                  </Grid>
                ) : (
                  <Grid item xs={6}>
                    <Box sx={{ fontWeight: 'bold', fontSize: 'h5.fontSize' }}>
                      Водитель будет назначен позже
                    </Box>
                  </Grid>
                )}
              </Grid>
              {currentUser.role === 'Dispatcher' && (
                <Button
                  onClick={handleTicketCancel}
                  sx={{ color: 'white', marginTop: '20px' }}
                  variant="contained"
                >
                  Завершить заявку
                </Button>
              )}
            </Box>
          </Box>
        </Styled.Content>
      )}
    </Styled.Wrapper>
  );
};
