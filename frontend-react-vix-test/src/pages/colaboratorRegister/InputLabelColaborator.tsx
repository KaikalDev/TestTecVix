import {
  Autocomplete,
  colors,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { TextRob18Font2M } from "../../components/Text2M";
import { TextRob14Font1Xs } from "../../components/Text1Xs";
import { SimpleInput } from "../../components/Inputs/SimpleInput";
import { maskPhone } from "../../utils/maskPhone";
import { useState } from "react";
import { DropDown } from "../../components/Inputs/DropDown";

interface IOption<T extends string | number> {
  label: string;
  value: T;
}

interface IProps<T extends string | number> {
  label: string;
  required?: boolean;
  validate?: boolean;
  value: T;
  change: (value: T) => void;
  placeholder?: string;
  format?: "Telefone" | "dropDown" | "Password";
  options?: IOption<T>[];
}

export const InputLabelColaborator = ({
  label,
  required,
  value,
  validate,
  change,
  placeholder,
  format,
  options = [],
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
        height: "100%",
        justifyContent: `${format === "dropDown" ? "space-evenly" : ""}`,
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
      {format === "dropDown" ? (
        <DropDown
          data={options}
          value={value}
          onChange={(v) => change(v?.value as any)}
          placeholder="Selecione..."
          sxContainer={{
            width: "100%",
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "40px",
              borderRadius: "12px",
              backgroundColor: theme[mode].light,
              color: theme[mode].dark,

              "&:hover fieldset": {
                borderColor: theme[mode].blue,
              },

              "&.Mui-focused fieldset": {
                borderColor: theme[mode].blue,
                boxShadow: `0 0 0 2px ${theme[mode].blue}33`,
              },
            },

            "& .MuiInputBase-input": {
              padding: "8px 12px",
              fontSize: "14px",
            },

            "& .MuiAutocomplete-popupIndicator": {
              color: theme[mode].gray,
            },
          }}
        />
      ) : (
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
      )}
    </FormControl>
  );
};
