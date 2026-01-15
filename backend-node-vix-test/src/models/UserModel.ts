import { ERole, EVMStatus, Prisma } from "@prisma/client";
import { prisma } from "../database/client";
import { IListAllInput, IListAllUser } from "../types/IListAll";
import { TUserCreated } from "../types/validations/User/createUser";
import { TUserUpdated } from "../types/validations/User/updateUser";

export class UserModel {
  async findByEmail(email: string) {
    return prisma.user.findFirst({
      where: { email },
    });
  }

  async findById(idUser: string) {
    return prisma.user.findUnique({
      where: { idUser },
    });
  }

  async createUser(data: TUserCreated) {
    return prisma.user.create({ data });
  }

  async updateUser(idUser: string, data: TUserUpdated) {
    return await prisma.user.update({
      where: { idUser },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async deleteUser(idUser: string) {
    return await prisma.user.update({
      where: { idUser },
      data: { isActive: false, updatedAt: new Date(), deletedAt: new Date() },
    });
  }

  async listAll({ limit, page, idBrandMaster, isActive }: IListAllInput) {
    const skip = page * limit;

    const where: Prisma.userWhereInput = {
      deletedAt: null,
    };

    if (typeof isActive === "boolean") {
      where.isActive = isActive;
    }

    if (idBrandMaster !== null && idBrandMaster !== undefined) {
      where.idBrandMaster = idBrandMaster;
    }

    const [totalCount, result] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { lastLoginDate: "desc" },
        select: {
          idUser: true,
          username: true,
          fullName: true,
          userPhoneNumber: true,
          department: true,
          field: true,
          contractDate: true,
          email: true,
          profileImgUrl: true,
          role: true,
          idBrandMaster: true,
          isActive: true,
          lastLoginDate: true,
          createdAt: true,
          updatedAt: true,
          brandMaster: {
            select: {
              brandName: true,
              brandLogo: true,
            },
          },
        },
      }),
    ]);

    return {
      totalCount,
      result,
    };
  }
}
