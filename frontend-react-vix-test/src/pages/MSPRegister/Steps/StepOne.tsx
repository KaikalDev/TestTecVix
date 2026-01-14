import { Button, Stack } from "@mui/material";
import { InputLabelMsp } from "./InputLabelMsp";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { useTranslation } from "react-i18next";
import { CheckboxLabel } from "../../../components/CheckboxLabel";
import { Dispatch, SetStateAction } from "react";
import { isValidCNPJ } from "../../../utils/isValidCNPJ";
import {
  isNotEmpty,
  isValidEmail,
  isValidPercent,
  isValidPhone,
} from "../../../utils/isValidInput";

export const StepOne = ({
  setIsCreateMsp,
}: {
  setIsCreateMsp: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    companyName,
    setCompanyName,
    cnpj,
    setCnpj,
    locality,
    setLocality,
    phone,
    setPhone,
    sector,
    setSector,
    contactEmail,
    setContactEmail,
    minConsumption,
    setMinConsumption,
    discountRate,
    setDiscountRate,
    isPoc,
    setIsPoc,
    setActiveStep,
  } = useZMspRegisterPage();
  const { t } = useTranslation();

  const handleCancel = () => {
    setIsCreateMsp(false);
    setActiveStep(0);
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

  const isFormValid =
    isNotEmpty(companyName) &&
    isNotEmpty(locality) &&
    isValidCNPJ(cnpj) &&
    isNotEmpty(sector) &&
    isValidEmail(contactEmail) &&
    (phone ? isValidPhone(phone) : true) &&
    minConsumption >= 0 &&
    discountRate >= 0;

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
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "16px",
          marginRight: "25%",
        }}
      >
        <InputLabelMsp
          label={t("mspRegister.companyName")}
          required
          value={companyName}
          validate={isNotEmpty(companyName)}
          change={(value) => setCompanyName(value)}
          placeholder="Virtuax"
        />
        <InputLabelMsp
          label={t("mspRegister.location")}
          required
          validate={isNotEmpty(locality)}
          value={locality}
          change={(value) => setLocality(value)}
          placeholder={t("mspRegister.locationPlaceholder")}
        />
        <InputLabelMsp
          label={t("mspRegister.cnpj")}
          required
          validate={isValidCNPJ(cnpj)}
          value={cnpj}
          change={(value) => setCnpj(value)}
          placeholder="00.000.000/0001-00"
          format="CNPJ"
        />

        <InputLabelMsp
          label={t("mspRegister.phone")}
          value={phone}
          validate={isNotEmpty(phone) ? isValidPhone(phone) : true}
          change={(value) => setPhone(value)}
          format="Telefone"
          placeholder="(00) 00000-0000"
        />
        <InputLabelMsp
          label={t("mspRegister.sector")}
          required
          validate={isNotEmpty(sector)}
          value={sector}
          change={(value) => setSector(value)}
          placeholder={t("mspRegister.sectorPlaceholder")}
        />
        <InputLabelMsp
          label={t("mspRegister.contactEmail")}
          required
          format="Email"
          validate={isValidEmail(contactEmail)}
          value={contactEmail}
          change={(value) => setContactEmail(value)}
          placeholder="email@example.com"
        />
      </Stack>
      <hr />
      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "16px",
          marginRight: "25%",
          alignItems: "center",
        }}
      >
        <InputLabelMsp
          label={t("mspRegister.minConsumption")}
          value={minConsumption}
          validate={minConsumption >= 0}
          change={(value) => setMinConsumption(value)}
          placeholder="R$ 0,00"
          format="quantity"
        />
        <InputLabelMsp
          label={t("mspRegister.discountPercentage")}
          value={discountRate}
          validate={discountRate >= 0}
          change={(value) => setDiscountRate(value)}
          placeholder="0%"
          format="Percentual"
        />
        <CheckboxLabel
          label={t("mspRegister.isPoc")}
          checked={isPoc}
          handleChange={() => setIsPoc(!isPoc)}
        />
      </Stack>
      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "16px",
          marginRight: "25%",
          alignItems: "center",
        }}
      >
        <Button disabled={!isFormValid} onClick={() => setActiveStep(1)} variant="contained">
          Continuar
        </Button>
        <Button onClick={handleCancel} variant="outlined">
          Cancelar
        </Button>
      </Stack>
    </Stack>
  );
};
