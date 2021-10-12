import { createReducer, on } from '@ngrx/store';
import { User } from '../user';
import * as UserActions from './user.actions';
export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: false,
  currentUser: null,
};

export const userReducer = createReducer<UserState>(
  initialState,
  on(UserActions.maskUserName, (state) => {
    console.log('mask username', state);

    return {
      ...state,
      maskUserName: !state.maskUserName,
    };
  })
);
