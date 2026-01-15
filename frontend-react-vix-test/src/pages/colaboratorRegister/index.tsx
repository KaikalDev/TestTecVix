import { useTranslation } from "react-i18next";
import { useZTheme } from "../../stores/useZTheme";
import { ScreenFullPage } from "../../components/ScreenFullPage";
import { TextRob20Font1MB } from "../../components/Text1MB";
import { TextRob16Font1S } from "../../components/Text1S";
import { ColaboratorRegisterForm } from "./ColaboratorRegisterForm";
import Stack from "@mui/material/Stack/Stack";
import Box from "@mui/material/Box/Box";
import { ColaboratorTable } from "./ColaboratorTable/ColaboratorTable";
import { ColaboratorTableFilter } from "./ColaboratorTable/ColaboratorTableFilter";

export const ColaboratorRegister = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();

  return (
    <ScreenFullPage
      title={
        <TextRob20Font1MB
          sx={{
            color: theme[mode].primary,
            fontSize: "28px",
            fontWeight: "500",
            lineHeight: "40px",
          }}
        >
          {t("colaboratorRegister.title")}
          <span
            style={{ color: theme[mode].gray }}
          >{` | ${t("colaboratorRegister.sideTitle")}`}</span>
        </TextRob20Font1MB>
      }
      sxTitleSubTitle={{
        paddingLeft: "40px",
        paddingRight: "40px",
      }}
      sxContainer={{
        paddingLeft: "40px",
        paddingRight: "40px",
        paddingBottom: "40px",
      }}
      subtitle={
        <TextRob16Font1S sx={{ color: theme[mode].gray }}>
          {t("colaboratorRegister.subtitle")}
        </TextRob16Font1S>
      }
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "100%",
        }}
      >
        <ColaboratorRegisterForm />
        <Stack
          sx={{
            background: theme[mode].mainBackground,
            borderRadius: "16px",
            marginTop: "24px",
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
                {t("colaboratorRegister.tableTitle")}
              </TextRob16Font1S>
              <ColaboratorTableFilter />
            </Box>
            <ColaboratorTable />
          </Stack>
        </Stack>
      </Stack>
    </ScreenFullPage>
  );
};
