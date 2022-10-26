import { PhotoType, ProfileType } from '../shared/types/reducer-types';
import { GeneralResponse, instance } from './api';

type ProfilePhotoType = {
  photos: PhotoType;
};

export const profileAPI = {
  takeUserProfile(userId: number) {
    return instance
      .get<ProfileType>(`profile/${userId}`)
      .then((response) => response.data);
  },
  getUserStatus(userId: number) {
    return instance
      .get<string>(`profile/status/${userId}`)
      .then((response) => response.data);
  },
  updateUserStatus(status: string) {
    return instance.put<GeneralResponse>(`profile/status`, { status: status });
  },
  savePhoto(photo: any) {
    const formData = new FormData();
    formData.append('image', photo);
    return instance.put<GeneralResponse<ProfilePhotoType>>(
      `profile/photo`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  },
  saveProfile(profile: ProfileType) {
    return instance.put<GeneralResponse>(`profile`, profile);
  },
};
