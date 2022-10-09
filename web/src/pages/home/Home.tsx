import { Button } from 'antd';
import React, { FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTestData } from '../../redux/testSaga/testSelectors';
import { testRequest } from '../../redux/testSaga/testSlice';

export const Home: FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const data = useSelector(selectTestData);

  const click = useCallback(() => {
    dispatch(testRequest('asdad'));
  }, [dispatch]);

  return (
    <>
      <Button type="primary" onClick={click}>
        test
      </Button>
      {data}
    </>
  );
};
