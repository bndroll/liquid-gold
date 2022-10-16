import { Box, Grid } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SideBar } from '../../components/SideBar';
import { TicketCard } from '../../components/TicketCard';
import { selectAllTickets } from '../../redux/ticket/getAllTicketsSelectors';
import { getAllTicketsRequest } from '../../redux/ticket/getAllTicketsSlice';
import { Styled } from './styled';

export const AllTickets: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const allTickets = useSelector(selectAllTickets);

  useEffect(() => {
    dispatch(getAllTicketsRequest({}));
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
          Все заявки
        </Box>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
              {allTickets.map((item) => (
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
