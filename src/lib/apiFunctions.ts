import axios from 'axios';

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: string;
  registration_timestamp: Date;
  photo: string;
};

type FetchUsersResponse = {
  count: number;
  links: {
    prev_url: string;
    next_url: string;
  };
  page: number;
  success: boolean;
  total_pages: number;
  total_users: number;
  users: User[];
};

export function fetchUsersWrapper() {
  let nextUrl: null | string = null;
  return async () => {
    try {
      const url =
        nextUrl !== null ? nextUrl : import.meta.env.VITE_API_URL + 'page=1';
      const { data } = await axios.get<FetchUsersResponse>(url);
      nextUrl = data.links.next_url;
      console.log(data)
      return nextUrl !== null
        ? { lastPage: false, users: data.users }
        : { lastPage: true, users: data.users };
    } catch (error) {
      const { message } = error as Error;
      console.log(message);
      return { lastPage: false, users: [] };
    }
  };
}
