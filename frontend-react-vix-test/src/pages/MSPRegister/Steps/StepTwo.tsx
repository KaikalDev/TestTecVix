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
    enterOnEditing,
    setCompanyName,
    setCnpj,
    setLocality,
    setPhone,
    setSector,
    setContactEmail,
    setMinConsumption,
    setDiscountRate,
    setIsPoc,
    setEnterOnEditing,
  } = useZMspRegisterPage();

  const { createAnewBrandMaster, editBrandMaster } = useBrandMasterResources();

  const { t } = useTranslation();

  const handleCancel = () => {
    setIsCreateMsp(false);
    setActiveStep(0);
    setAdmName("");
    setAdmEmail("");
    setAdmPhone("");
    setPosition("");
    setAdmPassword("");
    setCompanyName("");
    setCnpj("");
    setLocality("");
    setPhone("");
    setSector("");
    setContactEmail("");
    setMinConsumption(0);
    setDiscountRate(0);
    setIsPoc(false);
  };

  const handleSubmit = async () => {
    let response;

    if (enterOnEditing) {
      response = await editBrandMaster({
        admName,
        admEmail,
        admPhone,
        admPassword,
        brandLogo: brandLogoUrl,
        cep,
        city,
        cnpj,
        brandName: companyName,
        emailContact: contactEmail,
        state: countryState,
        location: locality,
        mspDomain,
        placeNumber: phone,
        street,
        setorName: sector,
        domain: mspDomain,
        minConsumption,
        discountRate,
        district,
        isPoc,
        cityCode: cityCode ? Number(cityCode) : undefined,
      });
    } else {
      response = await createAnewBrandMaster({
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
    }

    if (!response) return;

    setEnterOnEditing(false);
    setIsCreateMsp(false);
    setActiveStep(0);
    handleCancel();
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
          change={(value) => setAdmName(value)}
          placeholder={t("mspRegister.completeNamePlaceholder")}
        />

        <InputLabelMsp
          label={t("mspRegister.email")}
          required
          format="Email"
          validate={isValidEmail(admEmail)}
          value={admEmail}
          change={(value) => setAdmEmail(value)}
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
          change={(value) => setAdmPhone(value)}
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
          change={(value) => setAdmPassword(value)}
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

      <LogoUpload url={brandLogoUrl} />

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
