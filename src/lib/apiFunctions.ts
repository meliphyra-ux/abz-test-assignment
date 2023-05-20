import axios from 'axios';
import { PostInputs } from './types';

// Grab ENV variable

const BASE_URL = process.env.REACT_APP_API_URL;

// Types related to Users and FetchRequests

type GeneralResponse = {
  success: boolean;
  message?: string;
};

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

export type Position = {
  id: number;
  name: string;
};

type FetchPositionsResponse = GeneralResponse & {
  positions: Position[];
};

type FetchUsersResponse = GeneralResponse & {
  count: number;
  links: {
    prev_url: string;
    next_url: string;
  };
  page: number;
  total_pages: number;
  total_users: number;
  users: User[];
};

type FetchTokenResponse = GeneralResponse & {
  token: string;
};

type PostUserResponse = GeneralResponse & {
  user_id?: number;
};

type FetchUserResponse = GeneralResponse & {
  user: User;
};

export async function fetchUsers(next_url: string) {
  try {
    // Giving axios type of response
    const { data, status } = await axios.get<FetchUsersResponse>(next_url);
    //Checking if response is valid
    if (status === 200 && data.success) {
      // Swapping current url to nextUrl
      // If last page, return true
      console.log(data)
      return next_url !== null
        ? {
            last_page: false,
            users: data.users,
            next_url: data.links.next_url,
            total_users: data.total_users,
            current_page: data.page,
          }
        : {
            last_page: true,
            users: data.users,
            next_url: data.links.next_url,
            total_users: data.total_users,
            current_page: data.page,
          };
    }
    // If response invalid
    throw new Error('Bad request, status: ' + status);
  } catch (error) {
    const { message } = error as Error;
    console.warn(message);
    // Returning empty object in case of error
    return { last_page: false, users: [] as User[], current_pata: 0 };
  }
}

export async function fetchPositions() {
  try {
    // Try to fetch positions
    const { data, status } = await axios.get<FetchPositionsResponse>(
      BASE_URL + 'positions'
    );
    // Validate response
    if (status === 200 && data.success) {
      return data.positions;
    }
    // In case of failure
    throw new Error(`Status code: ${status}, message: ${data.message}`);
  } catch (error) {
    const { message } = error as Error;
    console.warn(message);
    // Returning empty array to not cause an error in UI
    return [];
  }
}

export async function postUser(
  inputFields: PostInputs
): Promise<PostUserResponse> {
  try {
    // Getting token
    const {
      data: { token, success },
      status,
    } = await axios.get<FetchTokenResponse>(BASE_URL + 'token');
    // Validate response
    if (status === 200 && success) {
      // Setting format of formData
      const formData = new FormData();
      // Appending fields
      formData.append('name', inputFields['Your name']);
      formData.append('email', inputFields.Email);
      formData.append('phone', inputFields.Phone);
      formData.append('position_id', String(inputFields.Position));
      formData.append('photo', inputFields.Image[0]);

      // Try to post data
      const { data } = await axios<PostUserResponse>(
        process.env.REACT_APP_API_URL + 'users',
        {
          method: 'post',
          headers: {
            Token: token,
          },
          data: formData,
        }
      );
      // Returning a data from request
      return data;
    }
    throw new Error('Request failed');
  } catch (error) {
    const { message } = error as Error;
    console.warn(message);
    return { success: false, message } as PostUserResponse;
  }
}

export async function fetchUser(user_id: number) {
  try {
    const { data, status } = await axios.get<FetchUserResponse>(
      BASE_URL + `users/${user_id}`
    );
    if (status === 200 && data.success) {
      return data.user;
    }
    throw new Error(data.message);
  } catch (error) {
    const { message } = error as Error;
    console.warn(message);
    return null;
  }
}
