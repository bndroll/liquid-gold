import React, { FC, useRef } from 'react';
import { Map, YMaps, YMapsApi } from 'react-yandex-maps';

export const YandexMap: FC = (): JSX.Element => {
  const ymap = useRef<YMapsApi>();
  const onClick = () => {
    console.log(ymap.current);
  };

  return (
    <>
      <YMaps query={{ apikey: '320a7de8-f43a-4ec5-bdda-092da30ddbe1' }}>
        <Map
          onLoad={(m) => (ymap.current = m)}
          defaultState={{ center: [55.75, 37.57], zoom: 9 }}
          onClick={onClick}
        />
      </YMaps>
    </>
  );
};
