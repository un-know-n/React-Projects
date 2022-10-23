import axios from 'axios';

import { ProfileType, ResultCodes, ResultCodesForCaptcha } from '../shared/types/reducer-types';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'api-key': '359cbfdd-7b55-42b3-b3e3-34b581fec953',
  },
});

// type ResponseWithResultCodeType<T = {}, RC = ResultCodes> = {
//   data: T
//   messages: Array<string>
//   resultCode: RC
// }

type AuthResponseData = {
  id: number;
  email: string;
  login: string;
};

type ResponseForAuth = {
  data: AuthResponseData;
  message: Array<string>;
  resultCode: ResultCodes & ResultCodesForCaptcha;
};

export const usersAPI = {
  getUsers(usersAmount = 5, page = 1) {
    return instance
      .get(`users?count=${usersAmount}&page=${page}`)
      .then((response) => response.data);
  },
  followUser(userId: number) {
    return instance.post(`follow/${userId}`, {});
  },
  unfollowUser(userId: number) {
    return instance.delete(`follow/${userId}`);
  },
};

export const profileAPI = {
  takeUserProfile(userId: number) {
    return instance.get(`profile/${userId}`).then((response) => response.data);
  },
  getUserStatus(userId: number) {
    return instance
      .get(`profile/status/${userId}`)
      .then((response) => response.data);
  },
  updateUserStatus(status: string) {
    return instance.put(`profile/status`, { status: status });
  },
  savePhoto(photo: any) {
    const formData = new FormData();
    formData.append('image', photo);
    return instance.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  saveProfile(profile: ProfileType) {
    return instance.put(`profile`, profile);
  },
};

export const authAPI = {
  isUserAuthorized() {
    return instance
      .get<ResponseForAuth>('auth/me')
      .then((response) => response.data);
  },
  logIn(
    email: string,
    password: string,
    rememberMe = false,
    captcha: string | null = null,
  ) {
    debugger;
    return instance.post('auth/login', {
      email,
      password,
      rememberMe,
      captcha,
    });
  },
  logOut() {
    return instance.delete('auth/login');
  },
};

export const securityAPI = {
  getCaptchaURL() {
    return instance.get(`security/get-captcha-url`);
  },
};
