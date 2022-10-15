import { Box, Grid } from '@mui/material';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { FilterPanel } from '../../components/FilterPanel';
import { TFilter } from '../../components/FilterPanel/declarations';
import { SideBar } from '../../components/SideBar';
import { TransportCard } from '../../components/TransportCard';
import { selectAllTransport } from '../../redux/getAllTransport/getAllTransportSelectors';
import { TTransport } from '../../types';
import { Styled } from './styled';

export const CreateTicketTransport: FC = (): JSX.Element => {
  const allTransport = useSelector(selectAllTransport);
  const [filteredTransport, setFilteredTransport] = useState<TTransport[]>([]);

  const onFilterChange = (filter: TFilter): void => {
    const newFilteredTransport = allTransport.filter((item) => {
      let result = true;

      if (filter.filterByCategory !== 'All') {
        result &&= item.category === filter.filterByCategory;
      } else {
        result &&= true;
      }

      if (filter.filterByDescription !== 'All') {
        result &&= item.description === filter.filterByDescription;
      } else {
        result &&= true;
      }

      if (filter.filterByType !== 'All') {
        result &&= item.type === filter.filterByType;
      } else {
        result &&= true;
      }

      result &&= item.title
        .toLocaleLowerCase()
        .includes(filter.filterByTitile.toLocaleLowerCase());

      if (filter.filterByAvailability !== 'All') {
        result &&=
          (item.isFree && filter.filterByAvailability === 'true') ||
          (!item.isFree && filter.filterByAvailability === 'false');
      } else {
        result &&= true;
      }

      return result;
    });
    setFilteredTransport(newFilteredTransport);
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
          Выбор транспорта
        </Box>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Box sx={{ width: '800px', marginRight: '20px' }}>
            <Grid container spacing={2}>
              {filteredTransport.map((item) => (
                <Grid key={item._id} item xs={4}>
                  <TransportCard transport={item} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <FilterPanel
            transport={allTransport}
            onFilterChange={onFilterChange}
          />
        </Box>
      </Styled.Content>
    </Styled.Wrapper>
  );
};
