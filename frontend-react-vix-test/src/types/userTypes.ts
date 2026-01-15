export interface IUserResponse {
  idUser: string;
  username: string;
  fullName?: string | null;
  userPhoneNumber?: string | null;
  department?: string | null;
  field?: string | null;
  contractDate?: string | null;

  email: string;
  profileImgUrl?: string | null;

  role: "admin" | "manager" | "member";
  idBrandMaster?: number | null;
  isActive?: boolean | null;

  lastLoginDate?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;

  brandMaster?: {
    brandName: string;
    brandLogo?: string | null;
  } | null;
}

export interface IPincodeInfos {
  expiredPinCodeSeconds: number;
  pinCode: string;
  socketId: string | null;
  updatedAt: Date | string;
}

export interface IUserBasicInfo {
  fullName?: string | null;
  name?: string | null;
  username?: string | null;
  idUser?: number | null;
  idBrandMaster?: number | null;
}
