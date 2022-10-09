import React, { FC } from 'react';
import { TSpacerProps } from './declarations';
import { Styled } from './styled';

export const Spacer: FC<TSpacerProps> = ({ space }): JSX.Element => {
  return <Styled.Box space={space} />;
};
