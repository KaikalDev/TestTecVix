import { useTranslation } from "react-i18next";
import { useZTheme } from "../../stores/useZTheme";
import { Box, Button, InputLabel, Stack } from "@mui/material";
import { TextRob16Font1S } from "../../components/Text1S";
import { InputLabelColaborator } from "./InputLabelColaborator";
import { useZColaboratorRegister } from "../../stores/useZColaboratorRegister";
import { useUserResources } from "../../hooks/useUserResources";
import {
  INewMSPResponse,
  useBrandMasterResources,
} from "../../hooks/useBrandMasterResources";
import { useEffect, useState } from "react";
import { useListUsers } from "../../hooks/useListUsers";

export const ColaboratorRegisterForm = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const [brandMaster, setBrandMaster] = useState<INewMSPResponse>();
  const {
    colaboratorName,
    setColaboratorName,
    email,
    setEmail,
    phone,
    setPhone,
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    position,
    setPosition,
    department,
    setDepartment,
    permission,
    setPermission,
    hiringDate,
    setHiringDate,
    status,
    setStatus,
    idBrandMaster,
    setIdBrandMaster,
    idUser,
    setIdUser,
  } = useZColaboratorRegister();

  const { createUserByManager, updateUser } = useUserResources();
  const { fetchListUsers } = useListUsers();

  const { getSelf } = useBrandMasterResources();

  const handleClearForm = () => {
    setColaboratorName("");
    setEmail("");
    setPhone("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setPosition("");
    setDepartment("");
    setPermission("");
    setHiringDate("");
    setStatus("");
    setIdBrandMaster(null);
  };

  const handleCreateColaborator = async () => {
    await createUserByManager({
      email: email,
      fullName: colaboratorName,
      password: password,
      role: permission as "admin" | "manager" | "member",
      username: username,
      userPhoneNumber: phone,
    });
    handleClearForm();
  };

  const handleEdit = async () => {
    if (idUser !== null) {
      await updateUser(
        {
          idUser: idUser,
          email: email,
          fullName: colaboratorName,
          role: permission as "admin" | "manager" | "member",
          username: username,
          userPhoneNumber: phone,
        },
        idUser,
      );
    }
    setIdUser(null);
    handleClearForm();
    await fetchListUsers();
  };

  return (
    <Stack
      sx={{
        background: theme[mode].mainBackground,
        borderRadius: "16px",
        width: "100%",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <Stack
        sx={{
          gap: "40px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <TextRob16Font1S
            sx={{
              color: theme[mode].black,
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
            }}
          >
            {t("colaboratorRegister.subtitle")}
          </TextRob16Font1S>
        </Box>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "16px",
            height: "100%",
          }}
        >
          <Stack
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "16px",
              marginRight: "15%",
            }}
          >
            <InputLabelColaborator
              label={t("colaboratorRegister.completeName")}
              required
              value={colaboratorName}
              change={setColaboratorName}
              placeholder={t("colaboratorRegister.completeNamePlaceholder")}
            />
            <InputLabelColaborator
              label={t("colaboratorRegister.email")}
              required
              value={email}
              change={setEmail}
              placeholder={t("colaboratorRegister.emailPlaceholder")}
            />
            <InputLabelColaborator
              label={t("colaboratorRegister.phone")}
              format="Telefone"
              value={phone}
              change={setPhone}
              placeholder="(00) 00000-0000"
            />

            <InputLabelColaborator
              label={t("colaboratorRegister.username")}
              required
              value={username}
              change={setUsername}
              placeholder={t("colaboratorRegister.username")}
            />
            <InputLabelColaborator
              label={t("colaboratorRegister.password")}
              required
              value={password}
              change={setPassword}
              placeholder={t("colaboratorRegister.password")}
            />
            <InputLabelColaborator
              label={t("colaboratorRegister.confirmPassword")}
              value={confirmPassword}
              change={setConfirmPassword}
              placeholder={t("colaboratorRegister.confirmPassword")}
            />

            <InputLabelColaborator
              label={t("colaboratorRegister.position")}
              required
              value={position}
              change={setPosition}
              placeholder={t("colaboratorRegister.positionPlaceholder")}
            />
            <InputLabelColaborator
              label={t("colaboratorRegister.department")}
              value={department}
              change={setDepartment}
              placeholder={t("colaboratorRegister.departmentPlaceholder")}
            />
            <InputLabelColaborator
              label={t("colaboratorRegister.permission")}
              format="dropDown"
              options={[
                {
                  label: "Admin",
                  value: "admin",
                },
                {
                  label: "Manager",
                  value: "manager",
                },
                {
                  label: "Menber",
                  value: "member",
                },
              ]}
              value={permission}
              change={setPermission}
            />

            <InputLabelColaborator
              label={t("colaboratorRegister.hiringDate")}
              value={hiringDate}
              change={setHiringDate}
              placeholder="01/01/2025"
            />
            <InputLabelColaborator
              label={t("colaboratorRegister.status")}
              required
              value={status}
              change={setStatus}
            />
            <InputLabelColaborator
              label={t("colaboratorRegister.companyName")}
              value={brandMaster?.brandName || ""}
              change={setIdBrandMaster}
            />
          </Stack>
          <hr />
          <Stack
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "16px",
              marginRight: "15%",
              alignItems: "center",
            }}
          >
            <Button
              onClick={
                idUser !== null ? handleEdit : handleCreateColaborator
              }
              variant="contained"
            >
              {t("colaboratorRegister.save")}
            </Button>
            <Button variant="outlined">{t("colaboratorRegister.clear")}</Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
