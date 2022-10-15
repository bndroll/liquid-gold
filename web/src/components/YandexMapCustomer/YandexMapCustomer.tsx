import { Paper } from '@mui/material';
import React, { FC, useCallback, useRef, useState } from 'react';
import { YMaps, Map, YMapsApi, Placemark } from 'react-yandex-maps';
import { TYandexMapCustomerProps } from './declarations';

export const YandexMapCustomer: FC<TYandexMapCustomerProps> = ({
  onChangeCoordinates,
}): JSX.Element => {
  const ymap = useRef<YMapsApi>();

  const [coordinates, setCoordinates] = useState<number[]>([]);

  const onClick = (event: any): void => {
    setCoordinates([...event.get('coords')]);
    onChangeCoordinates([...event.get('coords')]);
  };

  return (
    <Paper>
      <YMaps query={{ apikey: '320a7de8-f43a-4ec5-bdda-092da30ddbe1' }}>
        <Map
          width={800}
          height={612}
          onLoad={(m) => (ymap.current = m)}
          defaultState={{ center: [55.75, 37.57], zoom: 9 }}
          onClick={onClick}
        >
          {coordinates.length > 0 && (
            <Placemark
              geometry={coordinates}
              options={{
                iconColor: '#FD941C',
              }}
            />
          )}
        </Map>
      </YMaps>
    </Paper>
  );
};
