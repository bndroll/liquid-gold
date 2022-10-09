import styled from 'styled-components';
import { TSpacerProps } from './declarations';

const Box = styled.div<TSpacerProps>`
  height: ${(props): number => props.space}px;
  min-width: ${(props): number => props.space}px;
`;

export const Styled = {
  Box,
};
