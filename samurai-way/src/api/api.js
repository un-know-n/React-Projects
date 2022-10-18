import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'api-key': '3c38d3f3-4214-45ee-8901-62eafc904de6',
  },
});

export const usersAPI = {
  getUsers(usersAmount = 5, page = 1) {
    return instance
      .get(`users?count=${usersAmount}&page=${page}`)
      .then((response) => response.data);
  },
  followUser(userId) {
    return instance.post(`follow/${userId}`, {});
  },
  unfollowUser(userId) {
    return instance.delete(`follow/${userId}`);
  },
};

export const profileAPI = {
  takeUserProfile(userId) {
    return instance.get(`profile/${userId}`).then((response) => response.data);
  },
  getUserStatus(userId) {
    return instance
      .get(`profile/status/${userId}`)
      .then((response) => response.data);
  },
  updateUserStatus(status) {
    return instance.put(`profile/status`, { status: status });
  },
  savePhoto(photo) {
    const formData = new FormData();
    formData.append('image', photo);
    return instance.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  saveProfile(profile) {
    return instance.put(`profile`, profile);
  },
};

export const authAPI = {
  isUserAuthorized() {
    return instance.get('auth/me');
  },
  logIn(email, password, rememberMe = false, captcha = null) {
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
