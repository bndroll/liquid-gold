import { Paper } from '@mui/material';
import React, { FC } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { Props } from './declarations';

export const YandexMapTicket: FC<Props> = ({ coords }): JSX.Element => {
  return (
    <Paper sx={{ height: '100%' }}>
      <YMaps query={{ apikey: '320a7de8-f43a-4ec5-bdda-092da30ddbe1' }}>
        <Map
          defaultState={{ center: coords, zoom: 9 }}
          width={567}
          height={282}
        >
          <Placemark
            geometry={coords}
            options={{
              iconColor: '#FD941C',
            }}
          />
        </Map>
      </YMaps>
    </Paper>
  );
};
