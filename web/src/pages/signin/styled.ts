import { Stack } from '@mui/material';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #fab529;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled(Stack)`
  width: 350px;
`;

export const Styled = {
  Container,
  FormContainer,
};
