import { colors, FormControl, InputLabel } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { TextRob18Font2M } from "../../../components/Text2M";
import { TextRob14Font1Xs } from "../../../components/Text1Xs";
import { SimpleInput } from "../../../components/Inputs/SimpleInput";
import { maskPhone } from "../../../utils/maskPhone";
import { maskCNPJ } from "../../../utils/maskCNPJ";
import { useState } from "react";

interface IProps<T extends string | number> {
  label: string;
  required?: boolean;
  validate?: boolean;
  value: T;
  change: (value: T) => void;
  placeholder?: string;
  format?: "Telefone" | "CNPJ" | "Percentual" | "quantity" | "Email" | "Password";
}

export const InputLabelMsp = ({
  label,
  required,
  value,
  validate,
  change,
  placeholder,
  format,
}: IProps<typeof value>) => {
  const [touched, setTouched] = useState(false);
  const { mode, theme } = useZTheme();
  const { t } = useTranslation();
  const isNumberType = typeof value === "number";
  const showError = touched && validate === false;

  const mask =
    value !== null && value !== "" && value !== 0 && value !== undefined
      ? format === "Telefone"
        ? maskPhone(value)
        : format === "CNPJ"
          ? maskCNPJ(value)
          : undefined
      : undefined;

  const valueMasked = mask ? mask : value;

  return (
    <FormControl
      sx={{
        marginLeft: "0px",
        display: "flex",
        gap: "8px",
        flexDirection: "column",
        marginBlock: "8px",
      }}
    >
      <InputLabel
        shrink
        htmlFor={`bootstrap-input-${label}`}
        className={label}
        sx={{
          color: theme[mode].dark,
          "&.Mui-focused": {
            color: theme[mode].blue,
          },
          display: "flex",
          gap: "8px",
          marginLeft: "0px",
        }}
      >
        <TextRob18Font2M>{label}</TextRob18Font2M>
        <TextRob14Font1Xs sx={{ color: theme[mode].gray }}>
          {required && t("mspRegister.required")}
        </TextRob14Font1Xs>
      </InputLabel>
      <SimpleInput
        id={`bootstrap-input-${label}`}
        type={isNumberType ? "number" : "text"}
        value={value === 0 ? "" : valueMasked}
        onBlur={() => setTouched(true)}
        onChange={(value) => change(value as typeof value)}
        inputSx={{
          height: "40px",
          borderRadius: "12px",
          backgroundColor: theme[mode].light,
          color: theme[mode].dark,
        }}
        placeholder={placeholder}
      />
      {showError && (
        <TextRob14Font1Xs sx={{ color: colors.red[600] }}>
          {format === "CNPJ"
            ? t("mspRegister.cnpjAlertMessage")
            : format === "Email" ? t("mspRegister.emailAlertMessage")
            : t("mspRegister.alertMessage")}
        </TextRob14Font1Xs>
      )}
    </FormControl>
  );
};
