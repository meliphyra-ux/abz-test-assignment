import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';

import { User, fetchUsers } from '../../lib/apiFunctions';

import { addPage, addUser, userReducer } from './userReducer';

export type UserContextProps = {
  users: User[];
  visiblePages: number;
  handleAddPage: Function;
  handleAddUser: Function;
  fetchParams: {
    next_url: string;
    last_page: boolean;
    total_users: number;
    current_page: number;
  };
};

const DEFAULT_VALUES: UserContextProps = {
  users: [],
  visiblePages: 0,
  handleAddPage: () => {},
  handleAddUser: () => {},
  fetchParams: {
    next_url: process.env.REACT_APP_API_URL + 'users?page=1&count=6',
    last_page: false,
    total_users: 0,
    current_page: 1,
  },
};
// Creating context + reducer to manipulate Users
export const UserContext = createContext<UserContextProps>(DEFAULT_VALUES);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, {
    users: [],
    visiblePages: 0,
  });
  // Creating fetchParams to control fetch request after user signs up
  const [fetchParams, setFetchParams] = useState({
    next_url: process.env.REACT_APP_API_URL + 'users?page=1&count=6',
    last_page: false,
    total_users: 0,
    current_page: 1,
  });

  // Handlers
  const handleAddUser = useCallback((user: User) => {
    dispatch(addUser(user));
  }, []);

  const handleAddPage = useCallback(
    (
      users: User[],
      next_url: string | null = null,
      current_page: number | null = null
    ) => {
      dispatch(addPage(users));
      setFetchParams((state) => ({
        ...state,
        next_url: next_url ?? state.next_url,
        current_page: current_page ?? state.current_page,
      }));
    },
    []
  );
  
  // Values, that will go through UserContext to User and SignUp sections
  const value: UserContextProps = {
    users: state.users,
    visiblePages: state.visiblePages,
    handleAddPage,
    handleAddUser,
    fetchParams,
  };

  useEffect(() => {
    // Preloading users in useEffect
    const preloadUsers = async () => {
      const { users, last_page, total_users, next_url, current_page } =
        await fetchUsers(fetchParams.next_url);
      handleAddPage(users);
      if (total_users && next_url)
        setFetchParams({
          total_users,
          last_page,
          next_url,
          current_page,
        });
    };
    preloadUsers();
  }, [handleAddPage]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
