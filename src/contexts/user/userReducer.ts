import { Reducer } from 'react';
import { User } from '../../lib/apiFunctions';
import { UserContextProps } from './UserContext';
import { ReducerAction, createAction } from '../../lib/reducersUtils';

// Types
export enum USER_REDUCER_ACTION {
  ADD_PAGE = 'ADD_PAGE',
  ADD_USER = 'ADD_USER',
}

type UserReducerAction = ReducerAction<USER_REDUCER_ACTION, User | User[]>;

type UserReducerProps = Omit<
  UserContextProps,
  'handleAddUser' | 'handleAddPage' | 'fetchParams'
>;

// User reducer

export const userReducer: Reducer<UserReducerProps, UserReducerAction> = (
  state: UserReducerProps,
  action: UserReducerAction
) => {
  switch (action.type) {
    case USER_REDUCER_ACTION.ADD_PAGE: {
      return {
        users: [...state.users, ...(action.payload as User[])],
        visiblePages: state.visiblePages + 1,
      };
    }
    case USER_REDUCER_ACTION.ADD_USER: {
      const newUsersArray = [action.payload as User, ...state.users];
      // Because of adding new user, pages on API are shifting
      // Poping last element would prevent double instance of the last loaded user
      newUsersArray.pop()
      return {
        users: newUsersArray,
        visiblePages: 1,
      };
    }
    default:
      return state;
  }
};

// Reducer Actions

export const addUser = (user: User) =>
  createAction(USER_REDUCER_ACTION.ADD_USER, user);
export const addPage = (users: User[]) =>
  createAction(USER_REDUCER_ACTION.ADD_PAGE, users);
