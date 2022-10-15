import { Box, Grid } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SideBar } from '../../components/SideBar';
import { TicketCard } from '../../components/TicketCard';
import { selectMyTickets } from '../../redux/ticket/getMyTicketsSelectors';
import { getMyTicketsRequest } from '../../redux/ticket/getMyTicketsSlice';
import { Styled } from './styled';

export const MyTickets: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const myTickets = useSelector(selectMyTickets);

  useEffect(() => {
    dispatch(getMyTicketsRequest({}));
  }, []);

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
          Мои заявки
        </Box>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
              {myTickets.map((item) => (
                <Grid key={item._id} item xs={4}>
                  <TicketCard ticket={item} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Styled.Content>
    </Styled.Wrapper>
  );
};
