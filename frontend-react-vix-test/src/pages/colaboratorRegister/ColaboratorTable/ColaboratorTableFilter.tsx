import { Box, Button, Stack } from "@mui/material";
import { FilterInput } from "../../../components/Inputs/FilterInput";
import { FilterIcon } from "../../../icons/FilterIcon";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useZColaboratorRegister } from "../../../stores/useZColaboratorRegister";

export const ColaboratorTableFilter = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const {
    colaboratorNameFilter,
    setColaboratorNameFilter,
    companyNameFilter,
    setCompanyNameFilter,
  } = useZColaboratorRegister();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        gap: "24px",
      }}
    >
      <FilterInput
        icon={<FilterIcon fill={theme[mode].gray} />}
        value={companyNameFilter}
        onChange={setCompanyNameFilter}
        placeholder={t("colaboratorRegister.companyFilterPlaceholder")}
      />
      <FilterInput
        icon={<FilterIcon fill={theme[mode].gray} />}
        value={colaboratorNameFilter}
        onChange={setColaboratorNameFilter}
        placeholder={t("colaboratorRegister.UserFilterPlaceholder")}
      />
    </Box>
  );
};
