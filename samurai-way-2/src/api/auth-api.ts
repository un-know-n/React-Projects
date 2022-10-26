import { ResultCodes, ResultCodesForCaptcha } from '../shared/types/reducer-types';
import { GeneralResponse, instance } from './api';

export type AuthResponseData = {
  id: number;
  email: string;
  login: string;
};

export type LoginResponseData = {
  userId: number;
};

export type ResponseForAuth = GeneralResponse<
  AuthResponseData,
  ResultCodes | ResultCodesForCaptcha
>;

export type ResponseForLogin = GeneralResponse<
  LoginResponseData,
  ResultCodes | ResultCodesForCaptcha
>;

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
    return instance.post<ResponseForLogin>('auth/login', {
      email,
      password,
      rememberMe,
      captcha,
    });
  },
  logOut() {
    return instance.delete<GeneralResponse>('auth/login');
  },
};
