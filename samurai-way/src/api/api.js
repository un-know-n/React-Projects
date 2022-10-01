import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'api-key': '359cbfdd-7b55-42b3-b3e3-34b581fec953',
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
};

export const authAPI = {
  authorizeUser() {
    return instance.get('auth/me');
  },
};
