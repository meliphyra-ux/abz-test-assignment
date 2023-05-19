import axios from 'axios';
import { PostInputs } from '../components/form/Form';

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

type FetchPositionsResponse = {
  success: boolean;
  positions: Position[];
  message?: string;
};

export type Position = {
  id: number;
  name: string;
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
  message?: string;
};

type FetchTokenResponse = {
  success: boolean;
  token: string;
};

type PostUserResponse = {
  success: boolean;
  user_id?: number;
  message: string;
}

export function fetchUsersWrapper() {
  let nextUrl: null | string = null;
  return async () => {
    try {
      // Creating url for axios request
      const url =
        nextUrl !== null
          ? nextUrl
          : process.env.REACT_APP_API_URL + 'users?count=6&page=1';
      // Giving axios type of response
      const { data, status } = await axios.get<FetchUsersResponse>(url);
      //Checking if response is valid
      if (status === 200 && data.success) {
        // Swapping current url to nextUrl
        nextUrl = data.links.next_url;
        // If last page, return true
        return nextUrl !== null
          ? { lastPage: false, users: data.users }
          : { lastPage: true, users: data.users };
      }
      // If response invalid
      throw new Error('Bad request, status: ' + status);
    } catch (error) {
      const { message } = error as Error;
      console.warn(message);
      // Returning empty object in case of error
      return { lastPage: false, users: [] };
    }
  };
}

export async function fetchPositions() {
  try {
    const { data, status } = await axios.get<FetchPositionsResponse>(
      process.env.REACT_APP_API_URL + 'positions'
    );
    if (status === 200 && data.success) {
      return data.positions;
    }
    throw new Error(`Status code: ${status}, message: ${data.message}`);
  } catch (error) {
    const { message } = error as Error;
    console.warn(message);
    return [];
  }
}

export async function postUser(inputFields: PostInputs): Promise<any> {
  try {
    
    const {
      data: { token, success },
      status,
    } = await axios.get<FetchTokenResponse>(
      process.env.REACT_APP_API_URL + 'token'
    );
    if (status === 200 && success) {
      const formData = new FormData();
    formData.append('name', inputFields['Your name'])
    formData.append('email', inputFields.Email)
    formData.append('phone', inputFields.Phone)
    formData.append('position_id', String(inputFields.Position))
    formData.append('photo', inputFields.Image[0])
      const { data } = await axios<PostUserResponse>(
        process.env.REACT_APP_API_URL + 'users',
        {
          method: 'post',
          headers: {
            Token: token
          },
          data: formData,
        },
        
      );
      
      return data;
    }
  } catch (error) {
    const { message } = error as Error
    console.log(message);
    return { success: false };
  }
}