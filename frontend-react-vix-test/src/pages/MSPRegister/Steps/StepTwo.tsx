import { Button, Stack } from "@mui/material";
import { InputLabelMsp } from "./InputLabelMsp";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { useTranslation } from "react-i18next";
import { Dispatch, SetStateAction } from "react";
import {
  isNotEmpty,
  isValidEmail,
  isValidPhone,
} from "../../../utils/isValidInput";
import { LogoUpload } from "./LogoUpload";
import { useBrandMasterResources } from "../../../hooks/useBrandMasterResources";

export const StepTwo = ({
  setIsCreateMsp,
}: {
  setIsCreateMsp: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    admName,
    setAdmName,
    admEmail,
    setAdmEmail,
    admPhone,
    setAdmPhone,
    position,
    setPosition,
    admPassword,
    setAdmPassword,
    setActiveStep,
    cep,
    city,
    cnpj,
    companyName,
    contactEmail,
    countryState,
    locality,
    mspDomain,
    phone,
    street,
    sector,
    streetNumber,
    cityCode,
    discountRate,
    district,
    isPoc,
    minConsumption,
    brandLogoUrl,
  } = useZMspRegisterPage();

  const { createAnewBrandMaster } = useBrandMasterResources();

  const { t } = useTranslation();

  const handleCancel = () => {
    setIsCreateMsp(false);
    setActiveStep(0);
    setAdmName("");
    setAdmEmail("");
    setAdmPhone("");
    setPosition("");
    setAdmPassword("");
  };

  const handleSubmit = () => {
    const newBrand = createAnewBrandMaster({
      admName,
      admEmail,
      admPhone,
      admPassword,
      brandLogo: brandLogoUrl,
      cep,
      city,
      cnpj,
      companyName,
      contactEmail,
      countryState,
      locality,
      mspDomain,
      phone,
      street,
      sector,
      streetNumber,
      cityCode: cityCode ? Number(cityCode) : undefined,
      position: "admin",
      discountRate,
      district,
      isPoc,
      minConsumption,
    });
    if (newBrand) {
      setIsCreateMsp(false);
      setActiveStep(0);
    }
  };

  return (
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
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "16px",
        }}
      >
        <InputLabelMsp
          label={t("mspRegister.completeName")}
          required
          value={admName}
          validate={isNotEmpty(admName)}
          change={setAdmName}
          placeholder={t("mspRegister.completeNamePlaceholder")}
        />

        <InputLabelMsp
          label={t("mspRegister.email")}
          required
          format="Email"
          validate={isValidEmail(admEmail)}
          value={admEmail}
          change={setAdmEmail}
          placeholder={t("mspRegister.emailPlaceholder")}
        />
      </Stack>

      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "16px",
        }}
      >
        <InputLabelMsp
          label={t("mspRegister.phone")}
          required
          validate={isNotEmpty(admPhone) ? isValidPhone(admPhone) : true}
          value={admPhone}
          change={setAdmPhone}
          placeholder="(00) 00000-0000"
          format="Telefone"
        />

        <InputLabelMsp
          label={t("mspRegister.position")}
          required
          validate={isNotEmpty(position)}
          value={"admin"}
          change={() => {}}
          placeholder={t("mspRegister.positionPlaceholder")}
        />

        <InputLabelMsp
          label={t("mspRegister.initialPassword")}
          required
          format="Password"
          value={admPassword}
          validate={isNotEmpty(admPassword)}
          change={setAdmPassword}
          placeholder={t("mspRegister.initialPasswordPlaceholder")}
        />

        <InputLabelMsp
          label={t("loginRegister.username")}
          value={""}
          validate={true}
          change={() => {}}
          placeholder={t("loginRegister.username")}
        />
      </Stack>

      <hr />

      <LogoUpload />

      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "16px",
          marginRight: "25%",
          alignItems: "center",
        }}
      >
        <Button variant="contained" onClick={handleSubmit}>
          {t("mspRegister.confirm")}
        </Button>

        <Button variant="outlined" onClick={() => setActiveStep(0)}>
          {t("mspRegister.back")}
        </Button>
      </Stack>
    </Stack>
  );
};
