import { takeEvery, put, call } from '@redux-saga/core/effects';
import { SagaIterator } from 'redux-saga';
import { TUserRes } from '../../types';
import { getUserByIdRequest, getUserByIdSuccess } from './getUserByIdSlice';
import { getUserById } from './service';

export function* getUserByIdWorker(
  action: ReturnType<typeof getUserByIdRequest>
): SagaIterator {
  try {
    console.log(action.payload);
    const response: TUserRes = yield call(getUserById, action.payload.id);
    yield put(getUserByIdSuccess(response));
  } catch (e) {}
}

export function* getUserByIdWatcher(): SagaIterator {
  yield takeEvery(getUserByIdRequest.type, getUserByIdWorker);
}
