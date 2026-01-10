import { user } from "@prisma/client";

export const newUserMock: user = {
  idUser: "1",
  username: "testuser",
  fullName: "Test User",
  email: "test@example.com",
  password: "hashedpassword",
  role: "member",
  isActive: true,
  profileImgUrl: null,
  userPhoneNumber: null,
  department: null,
  field: null,
  contractDate: null,
  idBrandMaster: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  lastLoginDate: null,
};
