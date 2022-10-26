export type PostType = {
  id: number;
  title: string;
  likesCount: string;
};

export type PhotoType = {
  small: string;
  large: string;
};

export type ContactsType = {
  github: string | null;
  vk: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  mainLink: string | null;
};

export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
  fullName: string;
  contacts: ContactsType;
  photo: PhotoType;
};

export type UsersDataType = {
  id: number;
  name: string;
  status: string;
  photos: PhotoType;
  followed: boolean;
  uniqueUrlName?: string | null;
};

export enum ResultCodes {
  Success = 0,
  Error = 1,
}

export enum ResultCodesForCaptcha {
  CaptchaNeeded = 10,
}
