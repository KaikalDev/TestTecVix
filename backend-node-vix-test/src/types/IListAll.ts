import { TQuery } from "./validations/Queries/queryListAll";
import { TQueryUser } from "./validations/User/userListAll";
import { TQueryVM } from "./validations/VM/vmListAll";

export interface IListAll {
  idBrandMaster?: number | undefined | null;
  query: TQuery;
}

export interface IListAllVM {
  idBrandMaster?: number | undefined | null;
  query: TQueryVM;
}

export interface IListAllUser {
  idBrandMaster?: number | null;
}

export interface IListAllInput {
  limit: number;
  page: number;
  idBrandMaster: number | null;
  isActive?: boolean;
}
