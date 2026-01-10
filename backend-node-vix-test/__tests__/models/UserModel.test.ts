import { UserModel } from "../../src/models/UserModel";
import { prismaMock } from "../singleton";
import { newUserMock } from "../__mocks__/Users";
import { TUserCreated } from "../../src/types/validations/User/createUser";

describe("UserModel", () => {
  let userModel: UserModel;

  beforeEach(() => {
    userModel = new UserModel();
  });

  it("should find a user by id", async () => {
    prismaMock.user.findUnique.mockResolvedValue(newUserMock);

    const user = await userModel.findById("1");
    expect(user).toEqual(newUserMock);
  });

  it("should return null if user id not found", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const user = await userModel.findById("999");
    expect(user).toBeNull();
  });

  it("should find a user by email", async () => {
    prismaMock.user.findFirst.mockResolvedValue(newUserMock);

    const user = await userModel.findByEmail("test@example.com");
    expect(user).toEqual(newUserMock);
  });

  it("should return null if email not found", async () => {
    prismaMock.user.findFirst.mockResolvedValue(null);

    const user = await userModel.findByEmail("notfound@example.com");
    expect(user).toBeNull();
  });

  it("should create a new user", async () => {
    const input: TUserCreated = {
      username: "newuser",
      email: "new@example.com",
      password: "12345678",
      role: "member",
      isActive: true,
      fullName: "New User",
    };

    prismaMock.user.create.mockResolvedValue(newUserMock);

    const user = await userModel.createUser(input);

    expect(user).toEqual(newUserMock);
  });

  it("should update a user", async () => {
    const updatedData = { username: "updatedUser" };
    const updatedUser = {
      ...newUserMock,
      ...updatedData,
      updatedAt: new Date(),
    };

    prismaMock.user.update.mockResolvedValue(updatedUser);
    const user = await userModel.updateUser("1", updatedData);
    expect(user.username).toBe("updatedUser");
  });

  it("should soft delete a user", async () => {
    const deletedUser = {
      ...newUserMock,
      isActive: false,
      deletedAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.user.update.mockResolvedValue(deletedUser);
    const user = await userModel.deleteUser("1");
    expect(user.isActive).toBe(false);
    expect(user.deletedAt).toBeInstanceOf(Date);
  });
});
