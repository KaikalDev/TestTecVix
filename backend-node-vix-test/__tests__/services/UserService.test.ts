import bcrypt from "bcryptjs";
import { UserService } from "../../src/services/UserService";
import { UserModel } from "../../src/models/UserModel";
import { AppError } from "../../src/errors/AppError";
import { newUserMock } from "../__mocks__/Users";
import { genToken } from "../../src/utils/jwt";

jest.mock("../../src/models/UserModel");
jest.mock("bcryptjs");
jest.mock("../../src/utils/jwt");

describe("UserService - login & register", () => {
  let userService: UserService;
  let userModelMock: jest.Mocked<UserModel>;

  beforeEach(() => {
    userService = new UserService();
    userModelMock = (userService as any).userModel as jest.Mocked<UserModel>;
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should return token and user when credentials are valid", async () => {
      userModelMock.findByEmail.mockResolvedValue(newUserMock);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (genToken as jest.Mock).mockReturnValue("mocked-token");

      const result = await userService.login(newUserMock.email, "password");

      expect(userModelMock.findByEmail).toHaveBeenCalledWith(newUserMock.email);
      expect(bcrypt.compare).toHaveBeenCalledWith("password", newUserMock.password);
      expect(result).toEqual({ token: "mocked-token", user: newUserMock });
    });

    it("should throw if user email does not exist", async () => {
      userModelMock.findByEmail.mockResolvedValue(null);

      await expect(userService.login("notfound@example.com", "pass"))
        .rejects.toBeInstanceOf(AppError);
    });

    it("should throw if password is wrong", async () => {
      userModelMock.findByEmail.mockResolvedValue(newUserMock);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(userService.login(newUserMock.email, "wrongpass"))
        .rejects.toBeInstanceOf(AppError);
    });
  });

  describe("register", () => {
    it("should create a new user if email is not used", async () => {
      const input = {
        username: "newuser",
        email: "new@example.com",
        password: "12345678",
        role: "member",
      };
      userModelMock.findByEmail.mockResolvedValue(null);
      userModelMock.createUser.mockResolvedValue({ ...input, isActive: true } as any);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashed-pass");

      const result = await userService.register(input as any);

      expect(userModelMock.findByEmail).toHaveBeenCalledWith(input.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(input.password, 10);
      expect(userModelMock.createUser).toHaveBeenCalledWith({
        ...input,
        password: "hashed-pass",
        isActive: true,
      });
      expect(result.isActive).toBe(true);
    });

    it("should throw if email already exists", async () => {
      userModelMock.findByEmail.mockResolvedValue(newUserMock);

      await expect(userService.register({
        username: "newuser",
        email: newUserMock.email,
        password: "12345678",
        role: "member",
      } as any)).rejects.toBeInstanceOf(AppError);
    });
  });
});
