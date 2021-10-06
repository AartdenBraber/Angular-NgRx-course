import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { User } from '../user';
export interface State extends AppState.State {
  user: User;
}

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: false,
  currentUser: null,
};

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  (state) => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  (state) => state.currentUser
);

export const userReducer = createReducer<UserState>(
  initialState,
  on(createAction('[User] Toggle Mask Username'), (state) => {
    console.log('mask username', state);

    return {
      ...state,
      maskUserName: !state.maskUserName,
    };
  })
);
