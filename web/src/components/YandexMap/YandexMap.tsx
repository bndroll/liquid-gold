import { Paper } from '@mui/material';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Map, Placemark, YMaps, YMapsApi } from 'react-yandex-maps';
import { selectAllTransport } from '../../redux/getAllTransport/getAllTransportSelectors';
import { TTransport } from '../../types';
import { FilterPanel } from '../FilterPanel';
import { TFilter } from '../FilterPanel/declarations';
import { TransportInfoPopover } from '../TransportInfoPopover';
import { Styled } from './styled';

export const YandexMap: FC = (): JSX.Element => {
  const ymap = useRef<YMapsApi>();
  const allTransport = useSelector(selectAllTransport);
  const [filteredTransport, setFilteredTransport] = useState<TTransport[]>([]);

  const [selectedTransport, setSelectedTransport] = useState<TTransport | null>(
    null
  );

  useEffect(() => {
    if (allTransport.length) {
      setFilteredTransport(allTransport);
    }
  }, [allTransport]);

  const onClick = useCallback(
    (id: string): void => {
      if (selectedTransport && selectedTransport._id === id) {
        setSelectedTransport(null);
        return;
      }
      const transport = allTransport.find(({ _id }) => _id === id);
      setSelectedTransport(transport);
    },
    [allTransport, selectedTransport]
  );

  const onFilterChange = (filter: TFilter): void => {
    setSelectedTransport(null);
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

      if (filter.filterByAvailability !== 'All') {
        result &&=
          (item.isFree && filter.filterByAvailability === 'true') ||
          (!item.isFree && filter.filterByAvailability === 'false');
      } else {
        result &&= true;
      }

      result &&= item.title
        .toLocaleLowerCase()
        .includes(filter.filterByTitile.toLocaleLowerCase());

      return result;
    });
    setFilteredTransport(newFilteredTransport);
  };

  return (
    <Styled.Container>
      <Styled.Wrapper>
        <Paper>
          <YMaps query={{ apikey: '320a7de8-f43a-4ec5-bdda-092da30ddbe1' }}>
            <Map
              width={800}
              height={600}
              onLoad={(m) => (ymap.current = m)}
              defaultState={{ center: [55.75, 37.57], zoom: 9 }}
            >
              {filteredTransport.map((item) => (
                <Placemark
                  key={item._id}
                  defaultGeometry={[item.coordinates.lat, item.coordinates.lon]}
                  options={{
                    iconColor:
                      selectedTransport && selectedTransport._id === item._id
                        ? 'black'
                        : '#FD941C',
                  }}
                  onClick={() => onClick(item._id)}
                />
              ))}
            </Map>
          </YMaps>
          {selectedTransport && (
            <TransportInfoPopover transport={selectedTransport} />
          )}
        </Paper>
      </Styled.Wrapper>
      <FilterPanel transport={allTransport} onFilterChange={onFilterChange} />
    </Styled.Container>
  );
};
