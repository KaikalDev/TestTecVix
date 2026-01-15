import { PrivatePage } from "../auth/PrivatePage";
import { ColaboratorRegister } from "../pages/colaboratorRegister";
import { MSPRegisterPage } from "../pages/MSPRegister";

export const ColaboratorRegisterRouter = {
  path: "/colaborator-register",
  element: (
    <PrivatePage>
      <ColaboratorRegister />
    </PrivatePage>
  ),
};
